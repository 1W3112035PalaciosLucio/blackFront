import { IfStmt } from '@angular/compiler';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { timeStamp } from 'console';
import { range } from 'rxjs';
import Swal from "sweetalert2";
import { Carta } from '../Interfaces/Carta';
import { CartasService } from '../Servicios/cartas.service';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  constructor(private servicio:CartasService) { }

  cartasJugador: Carta[] = [];
  resultado:Carta[] = []

  puntosJugador = 0;
  plantarme =true;

  @Output() onPedirCarta = new EventEmitter<Carta[]>();
  @Output() onPLantarse = new EventEmitter();
  @Output() onPuntosjugador =  new EventEmitter();

  ngOnInit(): void {
   setTimeout(()=> {this.iniciarJugador()},10);
  }
  
   inputOptions = {
      '1 ': '1',
      '11' : '11',
  };

  iniciarJugador(){

    this.servicio.iniciarJugador().subscribe({
      next: (result) => {this.resultado = result},
      error: (error) => {console.log(error)}
    })

    setTimeout(()=> {this.cargarCartas(this.resultado)},20);
    setTimeout(()=> {this.calcularPuntos(false)},20);
  }

  async validarAs(carta:Carta){
    
    if(carta.valor == 1){
      const { value: puntos } = await Swal.fire({
        title: 'Seleccione un valor para el AS',
        input: 'radio',
        inputOptions: this.inputOptions,
      })
      if (puntos == 11) {
        this.puntosJugador += 10;
        this.onPuntosjugador.emit(this.puntosJugador);
      }
    }
  }

  pedirCarta() {
    var cartaNueva = {} as Carta;

    this.servicio.pedirCarta().subscribe({
      next: (carta) => {this.cartasJugador.push(cartaNueva = new Carta(carta.id,carta.valor,carta.palo)), this.resultado.push(carta)},
      error: (error) => {console.log(error)}
    })
    setTimeout(()=> {this.calcularPuntos(true)},20);
    this.onPuntosjugador.emit(this.puntosJugador);
    this.onPedirCarta.emit(this.cartasJugador);
  }
  
  
  plantarse(){
      this.onPLantarse.emit();
      this.plantarme = false
  }

  calcularPuntos(flag:boolean){
  if(flag == false){
    this.cartasJugador.forEach(element => {
      if(element.valor >=10){
        this.puntosJugador += 10;
      }
      else{
        this.puntosJugador += element.valor
      }
     
      if(element.valor ==1){
        this.validarAs(element);
      }

    });
  }
  else{
    var carta = this.resultado[this.resultado.length-1];
    if(carta.valor == 1){
      this.puntosJugador += 1;
      this.validarAs(carta)
    }
    else{
      this.puntosJugador += carta.valor
    }
  }
  this.onPuntosjugador.emit(this.puntosJugador);
}

  cargarCartas(cartas:any[]){
    cartas.forEach(element => {
      var carta = new Carta(element.id,element.valor,element.palo);
      this.cartasJugador.push(carta);
    });
    this.onPedirCarta.emit(this.cartasJugador);
  }
}
