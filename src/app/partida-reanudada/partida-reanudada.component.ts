import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { sign } from 'crypto';
import { Carta } from '../Interfaces/Carta';
import { DetallePartida } from '../Interfaces/DetallePartida';
import { Usuario } from '../Interfaces/Usuario';
import { CartasService } from '../Servicios/cartas.service';
import { LoginService } from '../Servicios/login.service';

@Component({
  selector: 'app-partida-reanudada',
  templateUrl: './partida-reanudada.component.html',
  styleUrls: ['./partida-reanudada.component.css']
})
export class PartidaReanudadaComponent implements OnInit {

  email:string;
  idPartida:number;
  detallePartida : DetallePartida[];
  cartasJugador : Carta[] = [];
  cartasCrupier:Carta[] = [];
  resultado : any[]= [];
  puntosJugador: number;
  puntosCrupier: number;
  plantarme = true;
  resultadoJuego = "";

  constructor(private servicioC:CartasService,private route:Router,private parametros:ActivatedRoute, private servicioL:LoginService) {
      this.email = parametros.snapshot.params["email"];
      this.idPartida = parametros.snapshot.params["id"]
  }

  ngOnInit(): void {
    this.obtenerPartida();
    this.iniciarCrupier();
  }

  obtenerPartida(){
    this.servicioC.obtenerDetallePartidaById(this.idPartida).subscribe({
      next: (data) => (this.detallePartida = data, this.obtenerCartas()),
      error: (error) => (console.log(error))
    })
  }

  obtenerCartas(){
    this.detallePartida.forEach(element => {
      setTimeout(()=> {this.iniciarCartas(element.idCarta)},40);
    });
  }

  iniciarCartas(id:number){
    var cartaNueva: Carta;
    this.servicioC.pedirCartaById(id).subscribe({
      next: (carta) => {this.cartasJugador.push(cartaNueva = new Carta(carta.id,carta.valor,carta.palo)),this.CalcularPuntos()},
      error: (error) => {console.log(error)}
    })
    this.CalcularPuntos();
  }

  iniciarCrupier(){
    this.servicioC.iniciarCrupier().subscribe({
      next: (result) => {this.resultado = result}
    })
    setTimeout(()=> {this.cargarCartasCrupier(this.resultado)},40);
  }

  cargarCartasCrupier(cartas:any[]){
    cartas.forEach(element => {
      var carta = new Carta(element.id,element.valor,element.palo);
      this.cartasCrupier.push(carta);
    });
    this.CalcularPuntos();
  }


  CalcularPuntos(){
    var sumaC:number = 0
    var sumaJ:number = 0
    this.cartasCrupier.forEach(carta => {
      if(carta.valor >= 10)
      {
       sumaC += 10
      }
      else{
        sumaC+=carta.valor
      }
    });
    this.cartasJugador.forEach(carta => {
      if(carta.valor >= 10)
      {
       sumaJ += 10
      }
      else{
        sumaJ+=carta.valor
      }
    });

    this.puntosCrupier = sumaC;
    this.puntosJugador = sumaJ;
  }

  plantarse(){
    
    var cartaNueva = {} as Carta;
    this.servicioC.pedirCarta().subscribe({
      next : (data) => {this.cartasCrupier.push(cartaNueva = new Carta(data.id,data.valor,data.palo)), this.CalcularPuntos()},
      error: (error) => (console.log(error))
    });
    setTimeout(()=> {this.evaluarPuntos()},40);
  }

  evaluarPuntos(){
    if(this.puntosCrupier <= 16){
      this.plantarse();
      return
    }

    if (this.puntosJugador == 21) {
      this.resultadoJuego = "¡¡¡ 21 PUNTOS, BLACKJACK GANASTE !!!"
    }
    else if (this.puntosJugador > 21) {
      this.resultadoJuego = "Te pasaste de puntos, ganó el Crupier"
    }
    else if (this.puntosJugador > this.puntosCrupier) {
      this.resultadoJuego = "Felicidades, le ganaste al Crupier"
    }
    else if (this.puntosCrupier > 21) {
      this.resultadoJuego = "Felicidades ganaste la partida, el Crupier se pasó de puntos"
    }
    else if (this.puntosCrupier > this.puntosJugador) {
      this.resultadoJuego = "Ganó el Crupier, vuelve a intentarlo"
    }
    else if (this.puntosCrupier == this.puntosJugador) {
      this.resultadoJuego = "Empate, ninguno gana"
    }
    this.FinalizarPartida();
  }

  
  pedirCarta(){
    var cartaNueva = {} as Carta;

    this.servicioC.pedirCarta().subscribe({
      next: (carta) => {this.cartasJugador.push(cartaNueva = new Carta(carta.id,carta.valor,carta.palo)), this.resultado.push(carta),this.cargarDetalle(this.idPartida,carta.id),this.CalcularPuntos()},
      error: (error) => {console.log(error)}
    })
  }
  cargarDetalle(idPartida:number,idCarta:number){
    this.servicioC.agregarDetalle(idPartida,idCarta).subscribe({
      next: (data) => {console.log(data)},
      error: (error) => {console.log(error)}
    })
  }

  FinalizarPartida(){
    this.servicioC.terminarPartida(this.idPartida,this.puntosJugador,this.puntosCrupier).subscribe({
      next: (resultado) => {console.log("Partida Finalizada")},
      error: (error) => {console.log(error)}
    })
  }


}



