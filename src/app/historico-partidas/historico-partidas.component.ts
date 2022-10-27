import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Partida } from '../Interfaces/Partida';
import { Usuario } from '../Interfaces/Usuario';
import { CartasService } from '../Servicios/cartas.service';
import { LoginService } from '../Servicios/login.service';

@Component({
  selector: 'app-historico-partidas',
  templateUrl: './historico-partidas.component.html',
  styleUrls: ['./historico-partidas.component.css']
})
export class HistoricoPartidasComponent implements OnInit {

  email:string;
  reanudar: boolean = true;
  usuario = {} as Usuario;
  partidas: Partida [] = [];
  constructor(private servicioLog:LoginService, private route:ActivatedRoute, private servicioCar:CartasService, private router:Router) { 
    this.email = route.snapshot.params["email"];
    this.getJugador();
  }

  getJugador(){
    this.servicioLog.getUserByEmail(this.email).subscribe({
      next : (resultado) => {this.usuario = resultado, this.cargarPartidas(resultado.id)},
      error: (error) => {console.log(error)}
    })
  }

  cargarPartidas(id:number){
    this.servicioCar.obtenerPartidas(id).subscribe({
      next : (resultado) => {this.partidas = resultado},
      error: (error) => {console.log(error)}
    })
  }

  ngOnInit(): void {
  }

  ReanudarPartida(id:number){
    this.router.navigateByUrl("/reanudar/"+id+"/"+this.usuario.email)
  }

  Volver(){
    this.router.navigateByUrl("/inicio/"+this.usuario.email);
  }
}
