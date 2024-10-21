import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/register-dto';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsuarioDTO } from '../models/usuario-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.API_URL}/usuarios`;

  constructor( private http: HttpClient) { }

  registerUser(usuario: RegisterDto): Observable<RegisterDto> {
    return this.http.post<RegisterDto>(`${this.apiUrl}`, usuario)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 && error.error?.email) {
            return throwError(() => ({ emailExists: error.error.email[0] }));
          }
          return this.handleError(error);
        })
      );
  }
  listarUsuarios(): Observable<UsuarioDTO[]> {
    return this.http.get<UsuarioDTO[]>(this.apiUrl);
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
