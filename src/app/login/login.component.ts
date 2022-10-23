import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Login } from '../Interfaces/Login';
import { LoginService } from '../Servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup
  private subscription: Subscription = new Subscription();
  public url = "https://localhost:7092/api/Login/PostLogin";
  log = {} as Login;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: LoginService, private http: HttpClient) {
    // this.loginForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   contrasenia: ['', [Validators.required]],
    // });
    this.crearForm();
  }

  ngOnInit(): void {

  }
  crearForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      clave: ['', [Validators.required, Validators.minLength(4), Validators.minLength(8)]]
    });
  }

  login(): void {
    this.subscription.add(
      this.api.login(this.loginForm.value).subscribe((next) => {
        alert("si");
        this.router.navigateByUrl("/tablero");
        console.log(next);
      }, error => {
        alert(error.value);
        console.log(error.value);
      })
    )
  }


  // login() {
  //   const login: Login = {
  //     email: this.loginForm.get('email')?.value,
  //     contrasenia: this.loginForm.get('contrasenia')?.value
  //   };

  //   this.api.postLogin(login).subscribe((data) => {
  //     debugger;
  //     if (data.value.ok) {
  //       alert("Login correcto")
  //       this.router.navigateByUrl("productos/alta");
  //       console.log(data);
  //       this.loginForm.reset();
  //     }
  //     else {
  //       alert("Email o Contraseña incorrecta, por favor, verificar que los datos sean correctos")
  //       console.log;
  //       this.loginForm.reset();
  //     }
  //         }, (error) => {
  //     alert(error.error.title)

  //     console.log(error.error);
  //   })
  // }

  registrar() {
    this.router.navigateByUrl("/registro")
  }
}
