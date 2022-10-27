import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Observable } from 'rxjs';
import {Carta} from "../Interfaces/Carta";

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor(private http:HttpClient) {
   }

  iniciarJuego(email:string):Observable<any>{
  return this.http.post("https://localhost:5001/api/Partida/iniciarPartida",email)
  }

  agregarDetalle(idPartida:number,idCarta:number):Observable<any>{
    const body = {
      idPartida : idPartida,
      idCarta :idCarta
    }
    JSON.stringify(body);
    console.log(body)
    return this.http.post("https://localhost:5001/api/Partida/agregarDetallePartida",body)
  }

  iniciarJugador():Observable<any>{
    return this.http.get("https://localhost:5001/api/Partida/iniciarJugador");
  } 

  iniciarCrupier():Observable<any>{
    return this.http.get("https://localhost:5001/api/Partida/iniciarCrupier");
  }

  pedirCarta():Observable<any>{
    return this.http.get("https://localhost:5001/api/Partida/pedirCarta");
  }
}
