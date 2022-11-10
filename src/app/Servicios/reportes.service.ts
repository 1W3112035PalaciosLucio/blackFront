import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reporte1 } from '../Interfaces/Reportes/Reporte1';
import { Reporte2 } from '../Interfaces/Reportes/Reporte2';
import { Reporte3 } from '../Interfaces/Reportes/Reporte3';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private url: string = "https://localhost:5001/api/Reportes";

  constructor(private http: HttpClient) { }

  reporte1(): Observable<any> {
    return this.http.get(this.url + "/IndiceVictoriasCrupier")
  }
  reporte2(idUsuario: number): Observable<any> {
    console.log(idUsuario);
    return this.http.get(`${this.url}/CantidadJuegosPorDia/${idUsuario}`)
  }
  reporte3(idUsuario:number): Observable<any> {
    return this.http.get(`${this.url}/promedioJugadas21/${idUsuario}`)
  }
}
