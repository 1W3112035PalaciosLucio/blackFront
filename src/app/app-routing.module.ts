import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ReglasComponent } from './reglas/reglas.component';
import { TableroComponent } from './tablero/tablero.component';

const routes: Routes = [{path:"", component:InicioComponent},
{path:"tablero",component:TableroComponent},
{path:"reglas",component:ReglasComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
