import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  videoUrl:string;
  constructor(private router:Router) { 
    this.videoUrl = "https://res.cloudinary.com/dfyevp7g4/video/upload/v1665238886/blackjack/video/menuVideo.mp4"
  }

  ngOnInit(): void {
  }

  Jugar(){
    this.router.navigateByUrl("/tablero")
  }

  Reglas(){
    this.router.navigateByUrl("/reglas")
  }
}
