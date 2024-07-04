import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Login } from '../Interfaces/Login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DetUsuario } from '../Interfaces/DetUsuario';
import { RegistUsuario } from '../Interfaces/RegistUsuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "https://localhost:5001/api/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser!: DetUsuario | null;
  constructor(private http: HttpClient) { }


  registrarUsuario(dto: RegistUsuario): Observable<DetUsuario> {
    return this.http.post<DetUsuario>(`${this.url}Usuario/CrearUsuario`, dto);
  }

  login(dto: Login):Observable<any> {
    console.log(dto);
    return this.http.post(`${this.url}Login/Login`, dto)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
          }
        })
      );
  }

  usuarioLogueado() {
    const token = localStorage.getItem('token') ?? undefined;
    return !this.jwtHelper.isTokenExpired(token);
  }

  desloguearUsuario() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
  }
  //Se viene BJ
  getUserByEmail(email:string):Observable<any>{
    return this.http.get("https://localhost:5001/api/Usuario/getUserEmail/"+email)
  }
}





