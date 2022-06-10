import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Imagen } from 'src/app/clases/imagen';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  usuario: Usuario = new Usuario();
  msjError!: string;

  constructor(public router: Router, public authSvc: AuthService) { }

  ngOnInit(): void {
  }

  async onLogin() {
    this.usuario.email = this.email;
    this.usuario.password = this.password;
    await this.authSvc.login(this.usuario);
    //console.log("error", this.authSvc.msjError);
    if (this.authSvc.msjError != "") {
      this.msjError = this.authSvc.msjError;
    }
    else {
      this.router.navigate(['home']);
    }
  }

  async logEliseo() {
      this.email = 'leliseo89@hotmail.com';
      this.password = '123456';
  }

  // public usuario: Usuario = new Usuario();
  // public mostrarError = false;
  // dbPath = "usuariosClinica";
  // msjError!: string;
  // usuariosRef!: AngularFirestoreCollection<any>;
  // img1Url!: Imagen;
  // img1Nombre!: string;
  // img2Url!: Imagen;
  // img2Nombre!: string;
  // email!: string;
  // password!: string;

  // constructor(private authSvc: AuthService, private router: Router, private db: AngularFirestore) { }

  // ngOnInit(): void {
  // }

  ingresar(){
    this.usuario.email = this.email;
    this.usuario.password = this.password;

    this.authSvc.login(this.usuario).then((result) =>{
        //this.authSvc.isLoggedIn = true;
        console.log('Login exitoso', result);
        
        if (this.authSvc.msjError != "") {
          this.msjError = this.authSvc.msjError;
        }
        else {
          this.router.navigate(['bienvenida']);
        }
    })
    .catch((res)=>{
      if(res.message == "The password is invalid or the user does not have a password."){
        this.msjError = "La contraseña ingresada es invalida."
      }
    });
  }

  
  // async logEliseo() {
  //   //console.log(this.usuario);
  //   this.email = 'leliseo89@hotmail.com';
  //   this.password = '123456';
  //   //console.log(this.authSvc.msjError);
  // }



}
