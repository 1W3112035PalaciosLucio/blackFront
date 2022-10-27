import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ReglasComponent } from './reglas/reglas.component';
import { TableroComponent } from './tablero/tablero.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [

  { path: "inicio", component: InicioComponent, canActivate: [GuardGuard] },
  { path: "tablero", component: TableroComponent, canActivate: [GuardGuard] },
  { path: "reglas", component: ReglasComponent, canActivate: [GuardGuard] },
  { path: "registro", component: RegistroComponent },
  { path: "login", component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
