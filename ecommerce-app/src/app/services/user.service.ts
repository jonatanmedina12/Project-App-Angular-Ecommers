import { Injectable } from '@angular/core';
import { RegisterDto } from '../models/register-dto';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsuarioDTO } from '../models/usuario-dto';
import { AuthService } from './auth.service';
import { UsuarioUpdateDto } from '../models/usuario-update-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.API_URL}/usuarios`;
  constructor( private http: HttpClient,private autservice:AuthService) { }

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
  obtenerUsuario(): Observable<UsuarioDTO> {
    const username=this.autservice.getUserFromStorage()
    console.log()

    return this.http.post<UsuarioDTO>(`${this.apiUrl}/usuario`,  {username})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400 && error.error?.email) {
            return throwError(() => ({ emailExists: error.error.email[0] }));
          }
          return this.handleError(error);
        })
      );
  }
  actualizarPerfil(usuario: UsuarioUpdateDto): Observable<UsuarioDTO> {
    const formData = new FormData();
    const username=this.autservice.getUserFromStorage()
    formData.append('username', usuario.username);
    formData.append('email', usuario.email);
    if (usuario.photo) {
      formData.append('photo', usuario.photo);
    }

    return this.http.put<UsuarioDTO>(`${this.apiUrl}/actualizarUsuario`, formData)
      .pipe(catchError(this.handleError));
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
