import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carta } from '../Interfaces/Carta';
import { CartasService } from '../Servicios/cartas.service';
import  Swal from "sweetalert2";
import { tick } from '@angular/core/testing';
import { Usuario } from '../Interfaces/Usuario';
import { LoginService } from '../Servicios/login.service';

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {

  constructor(private servicio: CartasService, private route: Router, private router:ActivatedRoute, private api:LoginService) {
    this.email = router.snapshot.params["email"];
    this.getUsuario();
  }

  usuario = {} as Usuario;
  email:string ="";
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

  getUsuario(){
    this.api.getUserByEmail(this.email).subscribe({
      next : (data) => {this.usuario = data,console.log(this.usuario)},
      error: (error) => {console.log(error)}
    })
  }

  InicioPartida() {
    
    this.servicio.iniciarJuego(this.usuario.email).subscribe({
      next: (data) => {this.idPartida = data},
      error: (error) => {console.log(error)}
    })

    this.servicio.iniciarCrupier().subscribe({
      next: (result) => {this.resultado = result}
    })
    setTimeout(()=> {this.cargarCartas(this.resultado)},40);
    setTimeout(()=> {this.calcularPuntos(false)},40);


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
    setTimeout(()=> {this.evaluarPuntos()},40);
    setTimeout(()=> {this.FinalizarPartida()},40);
  }

  FinalizarPartida(){
    this.servicio.terminarPartida(this.idPartida,this.puntosJugador,this.puntosCrupier).subscribe({
      next: (resultado) => {console.log("Partida Finalizada")},
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
    this.route.navigateByUrl("/inicio/"+this.usuario.email);
  }

  PedirCarta(cartas: Carta[]) {
    this.cartasJugador = cartas;
  }
}

