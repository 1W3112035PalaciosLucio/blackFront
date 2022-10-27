import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HttpClientModule} from '@angular/common/http';
import { TableroComponent } from './tablero/tablero.component';
import { ReglasComponent } from './reglas/reglas.component'
import { CartasService } from './Servicios/cartas.service';
import { CrupierComponent } from './crupier/crupier.component';
import { JugadorComponent } from './jugador/jugador.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './Servicios/login.service';
import { JwtModule } from '@auth0/angular-jwt';
import { RegistroComponent } from './registro/registro.component';
import { HistoricoPartidasComponent } from './historico-partidas/historico-partidas.component';
import { PartidaReanudadaComponent } from './partida-reanudada/partida-reanudada.component'


export function tokenGetter(){
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    TableroComponent,
    ReglasComponent,
    CrupierComponent,
    JugadorComponent,
    LoginComponent,
    RegistroComponent,
    HistoricoPartidasComponent,
    PartidaReanudadaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config:{
         tokenGetter: tokenGetter,
         allowedDomains : ['localhost:5001'],
         disallowedRoutes : ['localhost:5001/api/Login/Login']
      }
   })
  ],
  providers: [CartasService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
