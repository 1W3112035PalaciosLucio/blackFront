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
    this.generarCartas();
   }

  palos  = ["S","H","D","C"];
  mazo: Carta[] =[];
  cartasJugador: Carta[] =[];
  cartasCrupier: Carta[] =[];
  puntosCrupier = 0;
  puntosJugador = 0;

  generarCartas(){
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j <= 13; j++) {
        this.mazo.push(new Carta(Math.random() * 52,j,this.palos[i]));   
      } 
    }
    this.mezclarCartas();
  }

  mezclarCartas(){
    for (let i = 0; i < 100; i++) {
      this.mazo.splice(Math.random() * 52, 0, this.mazo[0]);
      this.mazo.shift();
    };
  }

  pedirCarta():Observable<any>{
    return this.http.get("https://localhost:5001/api/Partida/pedirCarta");
  }

  iniciarJugador():Observable<any>{
    return this.http.get("https://localhost:5001/api/Partida/iniciarJugador");
  } 

  iniciarCrupier():Observable<any>{
    return this.http.get("https://localhost:5001/api/Partida/iniciarCrupier");
  }

  generarCartasCrupier():Carta[]{

    while(this.puntosCrupier < 17){
      const cartaCrupier = this.mazo[Math.floor(Math.random()*this.mazo.length)];
      this.cartasCrupier.push(cartaCrupier);
      let puntos = this.puntosCrupier;
      
      if(cartaCrupier.valor >= 10 )
      {
        this.puntosCrupier += 10;  
      }
      else if(cartaCrupier.valor == 1 && puntos + 11 <= 21)//el as suma 11 si la cantidad de puntos del crupier no se pasa de 21
      {
        this.puntosCrupier += 11;
      }

      else
      {
      this.puntosCrupier += cartaCrupier.valor;
      }

    }
    return this.cartasCrupier;  
  } 

  calcularPuntosCupier():number{
    this.puntosCrupier = 0;
    let puntos = this.puntosCrupier;
    for (let index = 0; index < this.cartasCrupier.length; index++) {
      if(this.cartasCrupier[index].valor >= 10 )
      {
        this.puntosCrupier += 10;  
      }
      else if(this.cartasCrupier[index].valor == 1 && puntos + 11 <= 21)//el as suma 11 si la cantidad de puntos del crupier no se pasa de 21
      {
        this.puntosCrupier += 11;
      }
      else 
      {
        this.puntosCrupier += this.cartasCrupier[index].valor;
      }
    }
    return this.puntosCrupier;
  }

  reiniciarJuego(){
    this.cartasCrupier = [];
    this.puntosCrupier = 0;
    this.puntosJugador = 0;
    this.cartasJugador = [];
    this.mezclarCartas();
  }
}
