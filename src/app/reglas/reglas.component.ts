import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.css']
})
export class ReglasComponent implements OnInit {
  tableroImg = "assets/images/f.jpg"

  constructor(private route: Router, private renderer: Renderer2) {
    renderer.setStyle(
      document.body,
      "background-image",
      'url("assets/images/fondoBJ.jpg")'
    );

  }

  ngOnInit(): void {
  }

  Volver() {
    this.route.navigateByUrl("");
  }
}
