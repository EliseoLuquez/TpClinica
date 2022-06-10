import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  islogged = false;

  constructor(private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    console.log(this.authSvc.isLoggedIn);
    
    if(this.authSvc.isLoggedIn){
      this.islogged = true;
    }
    else{
      this.islogged = false;
    }
    console.log(this.islogged);
    
  }

  goIngreso(){
    this.router.navigate(['ingreso/login']);
  }

  goRegistro(){
    this.router.navigate(['ingreso/registro']);
  }
}
