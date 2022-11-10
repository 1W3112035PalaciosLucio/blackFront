import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ReglasComponent } from './reglas/reglas.component';
import { TableroComponent } from './tablero/tablero.component';
import { GuardGuard } from './guards/guard.guard';
import { HistoricoPartidasComponent } from './historico-partidas/historico-partidas.component';
import { PartidaReanudadaComponent } from './partida-reanudada/partida-reanudada.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  { path: "partidas/:email", component: HistoricoPartidasComponent },
  { path: "reanudar/:id/:email", component: PartidaReanudadaComponent },
  { path: "inicio/:email", component: InicioComponent, canActivate: [GuardGuard] },
  { path: "tablero/:email", component: TableroComponent, canActivate: [GuardGuard] },
  { path: "reglas/:email", component: ReglasComponent, canActivate: [GuardGuard] },
  { path: "reportes/:email", component: ReportesComponent, canActivate: [GuardGuard] },
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
