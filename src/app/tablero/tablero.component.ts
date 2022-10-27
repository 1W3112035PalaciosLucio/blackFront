import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Carta } from '../Interfaces/Carta';
import { CartasService } from '../Servicios/cartas.service';
import  Swal from "sweetalert2";
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  constructor(private servicio: CartasService, private route: Router, private renderer: Renderer2) {
    renderer.setStyle(
      document.body,
      "background-image",
      'url("assets/images/fondoBJ.jpg")'
    );

  }

  partidaIniciada = true;
  resultado: Carta[]  = []
  cartasJugador: Carta[] = [];
  cartasCrupier: Carta[] = [];
  puntosJugador: number = 0;
  puntosCrupier: number = 0;
  resultadoJuego = "";
  idPartida: number = 0;
  tableroImg!: string;


  ngOnInit(): void {
  }

  InicioPartida() {
    
    /**this.servicio.iniciarJuego("string").subscribe({
      next: (data) => {this.idPartida = data},
      error: (error) => {console.log(error)}
    })**/

    this.servicio.iniciarCrupier().subscribe({
      next: (result) => {this.resultado = result}
    })
    setTimeout(()=> {this.cargarCartas(this.resultado)},10);
    setTimeout(()=> {this.calcularPuntos(false)},10);

    //this.cargarDetalle(1,1);
    this.partidaIniciada = false;
  }

  cargarCartas(cartas:any[]){
    cartas.forEach(element => {
      var carta = new Carta(element.id,element.valor,element.palo);
      this.cartasCrupier.push(carta);
      this.calcularPuntos(carta.valor)
    });
  }

  calcularPuntos(valor:any){ 
        if(valor >= 10){
          this.puntosCrupier += 10
        }
        else if(valor == 1 && this.puntosCrupier + 11 <= 21)
        {
          this.puntosCrupier += 11;
        }
        else{
        this.puntosCrupier += valor
        }
    }
  
  Plantarse() {

    var cartaNueva = {} as Carta;
    this.servicio.pedirCarta().subscribe({
      next : (data) => {this.cartasCrupier.push(cartaNueva = new Carta(data.id,data.valor,data.palo)), this.calcularPuntos(cartaNueva.valor)},
      error: (error) => (console.log(error))
    });
    setTimeout(()=> {this.evaluarPuntos()},10);
  }

  cargarDetalle(idPartida:number,idCarta:number){
    this.servicio.agregarDetalle(idPartida,idCarta).subscribe({
      next: (data) => {console.log(data)},
      error: (error) => {console.log(error)}
    })
  }

  evaluarPuntos(){
    if(this.puntosCrupier <= 16){
      this.Plantarse();
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
  }



  Reiniciar() {
    this.partidaIniciada = true;
    this.cartasCrupier = [];
    this.cartasJugador = [];
    this.puntosCrupier = 0;
    this.puntosJugador = 0;
    this.resultadoJuego = "";
  }

  obtenerPuntosJugador(puntosJ:number){
    this.puntosJugador = puntosJ;
  }

  Volver() {
    this.route.navigateByUrl("");
  }

  PedirCarta(cartas: Carta[]) {
    this.cartasJugador = cartas;

  }
}

