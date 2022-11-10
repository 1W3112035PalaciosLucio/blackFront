import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { Partida } from '../Interfaces/Partida';
import { Reporte1 } from '../Interfaces/Reportes/Reporte1';
import { Reporte2 } from '../Interfaces/Reportes/Reporte2';
import { Reporte3 } from '../Interfaces/Reportes/Reporte3';
import { Usuario } from '../Interfaces/Usuario';
import { CartasService } from '../Servicios/cartas.service';
import { LoginService } from '../Servicios/login.service';
import { ReportesService } from '../Servicios/reportes.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit, OnDestroy {

  email: string;
  reanudar: boolean = true;
  usuario = {} as Usuario;
  partidas: Partida[] = [];

  porcentaje: number;
  stats: Reporte2[] = [];
  idUsuario: number;


  fechas: any[] = [];
  cantidadPartidas: number[] = [];

  datos: ChartData<'line', number[]>
  label: number[] = [];

  reporte3 = {} as Reporte3;
  valorReporte3: number[] = [];
  pie: ChartData<'pie', number[]>

  datos1: ChartData<'line', number[]>
  reporte1:number[]=[];
  retorno: number[] = [];
  pr:number;



  private subscription = new Subscription();

  constructor(private servicioLog: LoginService, private route: ActivatedRoute, private router: Router, private servicioCar: CartasService,
    private reporte: ReportesService) {
    this.email = route.snapshot.params["email"];
    this.getJugador();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ///Reporte 2
  CargarGrafico() {
    this.datos = {
      labels: this.fechas,
      datasets: [{
        data: this.cantidadPartidas,
        label: "Cantidad juegos",
        borderColor: "#2c5672",
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        backgroundColor: "#2c5672"
      }
      ]
    };
  }

  GetStats() {
    this.reporte.reporte2(this.usuario.id).subscribe({
      next: (resultado) => { this.stats = resultado, this.CargarFechas(), this.CargarPartidas(), this.CargarGrafico() },
      error: (error) => { console.log(error) }
    })
  }

  CargarFechas() {
    this.stats.forEach(dato => {
      this.fechas.push(dato.fecha);
    });
  }

  CargarPartidas() {
    this.stats.forEach(dato => {
      this.cantidadPartidas.push(dato.cantidadPartidas);
    });
  }

  getJugador() {
    this.servicioLog.getUserByEmail(this.email).subscribe({
      next: (resultado) => { this.usuario = resultado, this.GetStats(),
        this.cargarPartidas(resultado.id),
        this.CargarGrafico(),
        this.cargarIndiceBlackJack(),
        //this.CargarGrafico1(),
        this.CargarIndice();
      },
      error: (error) => { console.log(error) }
    })
  }

  cargarPartidas(id: number) {
    this.servicioCar.obtenerPartidas(id).subscribe({
      next: (resultado) => { this.partidas = resultado },
      error: (error) => { console.log(error) }
    })
  }

  Volver() {
    this.router.navigateByUrl("/inicio/" + this.usuario.email);
  }

  ///Grafico 3
  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {

      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},

      'y-axis-1': {
        position: 'left',
        grid: {
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff'
        }
      }
    },
  }

  cargarIndiceBlackJack() {
    this.reporte.reporte3(this.usuario.id).subscribe({
      next: (resultado) => {
        this.reporte3 = resultado, console.log(this.reporte3)
          , this.valorReporte3.push(this.reporte3.promedioCroupier);
        this.valorReporte3.push(this.reporte3.promedioJugadores), this.CargarGrafico3(), console.log(this.valorReporte3);
      },
      error: (error) => { console.log(error) }
    })


  }

  public pieChartData: ChartData<'pie', number[], string | string[]>;
  public pieChartType: ChartType = 'pie';

  CargarGrafico3() {
    this.pieChartData = {

      labels: ['Porcentaje del croupier', 'Porcentaje del jugador'],
      datasets: [{
        data: this.valorReporte3

      }]

    };
  }

  ///Grafico 1
  CargarIndice() {
    this.reporte.reporte1(this.usuario.id).subscribe({
      next: (resultado)=>{
        this.pr = resultado,
        this.CargarGrafico1()
      },
      error: (error) => { console.log(error) }
    });  
  }

  CargarGrafico1() {
    console.log(this.reporte1)
    this.datos1 = {
      labels:['Indice'],
      datasets: [{
        data: [this.pr],
        label: "Indice de victorias",
        borderColor: "#2c5672",
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        backgroundColor: "#2c5672"
      }]
    };
  }
  public barChartOptions1: ChartConfiguration['options'] = {
    elements: {
      bar: {

      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},

      'y-axis-1': {
        position: 'left',
        grid: {
          color: '#ffffff',
        },
        ticks: {
          color: '#ffffff'
        }
      }
    },
  }
}
