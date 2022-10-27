import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../Servicios/login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(): boolean {
    if (this.loginService.usuarioLogueado()) {
      return true;
    }

    this.mensajeError("Debe estar logueado", "Error");
    this.router.navigateByUrl("/login");
    return false;
  }

  mensajeError(errorMessage: string, title: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: errorMessage
    });
  }

}
