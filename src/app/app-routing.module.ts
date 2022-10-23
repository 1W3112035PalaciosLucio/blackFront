import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ReglasComponent } from './reglas/reglas.component';
import { TableroComponent } from './tablero/tablero.component';

const routes: Routes = [
{ path: "home", component: InicioComponent },
{ path: "tablero", component: TableroComponent },
{ path: "reglas", component: ReglasComponent },
{path:"registro", component: RegistroComponent},
{ path: "", component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
