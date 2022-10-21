import { Component, OnInit } from '@angular/core';
import { CartasService } from '../Servicios/cartas.service';

@Component({
  selector: 'app-crupier',
  templateUrl: './crupier.component.html',
  styleUrls: ['./crupier.component.css']
})
export class CrupierComponent implements OnInit {

  constructor(private servicio:CartasService) { }

  ngOnInit(): void {
  }

}
