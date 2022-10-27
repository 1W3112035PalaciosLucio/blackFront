import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from '../Servicios/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public formRegister!: FormGroup;

  constructor(public formBuilder: FormBuilder, private servicio: LoginService, private router: Router) {
    this.formulario();
  }

  ngOnInit(): void {
  }
  formulario() {
    this.formRegister = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    })
  }

  registrar() {
    if (!this.formRegister.valid)
      return this.mensajeError("Datos invalidos", "Invalido");
    else {
      this.subscription.add(
        this.servicio.registrarUsuario(this.formRegister.value).subscribe({
          next: (result) => { this.mensajeExitoso("Bienvenido", "Gracias por registrarte"); console.log(result); this.router.navigateByUrl("/login") },
          error: (error) => { this.mensajeError(error.error, "Error"); console.log(error.error), this.formRegister.reset() }
        })
      )
    }
  }
  volver() {
    this.router.navigateByUrl("/login")
  }

  mensajeError(errorMessage: string, title: string): void {
    Swal.fire({
      icon: 'error',
      title: title, color: '#343a40',
      text: errorMessage,
      confirmButtonColor: '#dc3545'

    });
  }
  mensajeExitoso(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title: title, color: '#343a40',
      text: text,
      confirmButtonColor: '#198754',
      timer: 5000
    });
  }
}
