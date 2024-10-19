import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { UsuarioDTO } from '../models/usuario-dto';
import { environment } from '../environments/environment';
import { RefreshTokendto } from '../models/refresh-tokendto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/auth`;
  private currentUserSubject: BehaviorSubject<UsuarioDTO | null>;
  public currentUser: Observable<UsuarioDTO | null>;

  private token: string ;
  constructor(private http: HttpClient) {
    this.token=""
    this.currentUserSubject = new BehaviorSubject<UsuarioDTO | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
   }

   login(loginRequest: LoginRequest): Observable<LoginResponse | string> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, loginRequest)
      .pipe(
        map(response => {
          console.log(response)

          if (!response.token) {

            return "Error al login";

          } else {
            this.setSession(response);
            return response.role;
          }
        }),
        catchError(this.handleError)
      );
  }


  registerUser(usuario: UsuarioDTO): Observable<UsuarioDTO> {
    return this.http.post<UsuarioDTO>(`${this.apiUrl}/register`, usuario)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 && error.error?.email) {
            // Error específico de correo electrónico duplicado
            return throwError(() => ({ emailExists: error.error.email[0] }));
          }
          // Otros errores
          return this.handleError(error);
        })
      );
  }
  
  logout(): Observable<any> {
    const userId = this.getUserId();

    if (userId) {
      return this.http.post(`${this.apiUrl}/logout/`, { id: userId }).pipe(
        tap(() => {
          this.currentUserSubject.next(null);
          this.clearSession();

        }),
        catchError(this.handleError)
      );
    } else {
      this.clearSession();
      this.currentUserSubject.next(null);
      return new Observable(subscriber => subscriber.complete());
    }
  }

  refreshToken(): Observable<boolean> {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('access_token');

    if (!username) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<RefreshTokendto>(`${this.apiUrl}/token/refresh`, { access:token,username: username})
      .pipe(
        tap(response => {
          this.setSessionContinue(response);
        }),
        map(() => true),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }


  private getUserFromStorage(): UsuarioDTO | null {
    const user = sessionStorage.getItem('username');
    return user ? JSON.parse(user) : null;
  }

  private getUserId(): number | null {
    const user = this.getUserFromStorage();
    console.log(user)
    return user ? user.id : null;
  }
  private clearSession(): void {
    localStorage.clear();
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('access_token');
  }

  private setSession(loginResponse: LoginResponse): void {
    sessionStorage.setItem('username', JSON.stringify(loginResponse.username));
    sessionStorage.setItem('access_token', loginResponse.token);
  }
  private setSessionContinue(authResult: RefreshTokendto): void {
    sessionStorage.setItem('access_token', authResult.token);

  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error:';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
