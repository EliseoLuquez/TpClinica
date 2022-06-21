import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Imagen } from 'src/app/clases/imagen';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  //usuarios!: any;
  usuarios:Array <Usuario> = new Array<Usuario>();
  arrayUsuarios:Array <Usuario> = new Array<Usuario>();

  constructor(public router: Router, public authSvc: AuthService, public usuarioSvc: UsuarioService) {
 
   }

  ngOnInit(): void {
    // this.usuarios = [];
    // this.usuarios = this.usuarioSvc.getUsuariosLog();
    // console.log(this.usuarios);
    this.cargarUsuarios();
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

  async logUsuario(usuario:any) {
    this.email = usuario.email;
    this.password = usuario.password;
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
    })
    .catch((res)=>{
      if(res.message == "The password is invalid or the user does not have a password."){
        this.msjError = "La contraseña ingresada es invalida."
      }
    });
  }

  cargarUsuarios()
  {
    this.arrayUsuarios = [];
    console.log(this.arrayUsuarios+"empieza");
    this.usuarioSvc.db.collection("usuariosClinica", ref => ref.orderBy('tipoUsuario')).snapshotChanges().pipe( map( (data: any) => {              
      data.map((us: any) =>
      { 
        const user = new Usuario();
        user.email = us.payload.doc.data().email;
        // console.log(user.Email);
        user.password = us.payload.doc.data().password;
        user.img1Url = us.payload.doc.data().img1Url;
        user.nombre = us.payload.doc.data().nombre;
        user.tipoUsuario = us.payload.doc.data().tipoUsuario;
        this.usuarios.push(user);
      });
    })).subscribe((datos: any) => {
    });
    console.log(this.arrayUsuarios+"termina");
    return this.usuarios;
   
  }


}
