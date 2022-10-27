import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../Servicios/login.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  videoUrl: string;
  constructor(private router: Router, private log: LoginService) {
    this.videoUrl = "https://res.cloudinary.com/dfyevp7g4/video/upload/v1665238886/blackjack/video/menuVideo.mp4"
  }

  ngOnInit(): void {
  }

  Jugar() {
    this.router.navigateByUrl("/tablero")
  }

  Reglas() {
    this.router.navigateByUrl("/reglas")
  }

  Desloguear() {
    if (this.usuarioLog()) {
      Swal.fire({
        icon: 'success',
        title: 'Hasta la proxima', color: '#f8f9fa',
        text: 'Sesión cerrada correctamente',
        background: 'linear-gradient(#343a40,#212529)',
        confirmButtonColor: '#198754',
        timer: 6000
      }).then(() => {
        this.log.desloguearUsuario();
        this.router.navigateByUrl("/login");
      });
    }
  }

  usuarioLog() {
    return this.log.usuarioLogueado();
  }
}
