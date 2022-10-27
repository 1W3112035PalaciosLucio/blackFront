import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.css']
})
export class ReglasComponent implements OnInit {
  tableroImg = "assets/images/f.jpg"

  constructor(private route: Router) {
  }

  ngOnInit(): void {
  }

  Volver() {
    this.route.navigateByUrl("/inicio");
  }
}
