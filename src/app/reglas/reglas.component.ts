import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../Interfaces/Usuario';
import { LoginService } from '../Servicios/login.service';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.css']
})
export class ReglasComponent implements OnInit {
  tableroImg = "assets/images/f.jpg"
  usuario = {} as Usuario;
  email:string ="";

  constructor(private route: Router, private api:LoginService,private router:ActivatedRoute) {
    this.email = router.snapshot.params["email"];
    this.getUsuario();
  }

  ngOnInit(): void {
  }

  getUsuario(){
    this.api.getUserByEmail(this.email).subscribe({
      next : (data) => {this.usuario = data,console.log(this.usuario)},
      error: (error) => {console.log(error)}
    })
  }
  Volver() {
    this.route.navigateByUrl("/inicio/"+this.usuario.email);
  }
}
