import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from '../Interfaces/Login';
import { LoginService } from '../Servicios/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm!: FormGroup
  private subscription: Subscription = new Subscription();
  public url = "https://localhost:7092/api/Login/PostLogin";
  log = {} as Login;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: LoginService, private http: HttpClient) {
    this.crearForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  crearForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      clave: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });
  }

  login(): void {
    this.subscription.add(
      this.api.login(this.loginForm.value).subscribe(next => {
        this.mensajeExitoso("Bienvenido", "Login exitoso!");
        this.router.navigateByUrl("/inicio")
      }, error => {
        this.mensajeError('Error durante el logueo:' + error.message, "Error");
      })
    )
  }

  mensajeError(errorMessage: string, title: string): void {
    Swal.fire({
      icon: 'error',
      title: title,color:'#f8f9fa',
      text: errorMessage,
      background:'linear-gradient(#343a40,#212529)',
      confirmButtonColor:'#dc3545'
    
    });
  }

  mensajeExitoso(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title: title,color:'#f8f9fa',
      text: text,
      background:'linear-gradient(#343a40,#212529)',
      confirmButtonColor:'#198754',
      timer: 5000
    });
  }

  registrar() {
    this.router.navigateByUrl("/registro");
  }
}
