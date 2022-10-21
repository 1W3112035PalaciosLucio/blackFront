import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    TableroComponent,
    ReglasComponent,
    CrupierComponent,
    JugadorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [CartasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
