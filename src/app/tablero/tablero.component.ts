import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Carta } from '../Interfaces/Carta';
import { CartasService } from '../Servicios/cartas.service';
import  Swal from "sweetalert2";

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
  tableroImg!: string;


  ngOnInit(): void {
  }

  InicioPartida() {
    this.servicio.iniciarCrupier().subscribe({
      next: (result) => {this.resultado = result}
    })
    setTimeout(()=> {this.cargarCartas(this.resultado)},10);
    setTimeout(()=> {this.calcularPuntos(false)},10);


    this.partidaIniciada = false;
  }

  cargarCartas(cartas:any[]){
    cartas.forEach(element => {
      var carta = new Carta(element.id,element.valor,element.palo);
      this.cartasCrupier.push(carta);
    });
  }

  calcularPuntos(flag:boolean){

    if(flag == true){
    this.puntosCrupier += this.resultado[this.resultado.length-1].valor;
    }
    else{
      this.cartasCrupier.forEach(element => {
        if(element.valor >= 10){
          this.puntosCrupier += 10
        }
        else if(element.valor == 1 && this.puntosCrupier + 11 <= 21)
        {
          this.puntosCrupier += 11;
        }
        else{
        this.puntosCrupier += element.valor
        }
      });
    }
  }





  Plantarse() {
    this.cartasCrupier = this.servicio.generarCartasCrupier();
    

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
    this.servicio.reiniciarJuego();
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

