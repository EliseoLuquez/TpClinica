import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  islogged = false;
  public usuario$: Observable<any> = this.authSvc.afAuth.user;
  
  constructor(private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.usuario$.subscribe((result: any) => {
      if(result != null)
      {
        this.islogged = true;
      }
    });

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
