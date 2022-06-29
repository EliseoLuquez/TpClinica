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

        this.usuarioSvc.addLogIngresos(this.usuario.email);
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

    var admin = new Usuario();
    admin.email = "leliseo89@hotmail.com";
    admin.password = "123456";
    admin.img1Url = "https://firebasestorage.googleapis.com/v0/b/lab4-f7591.appspot.com/o/usuariosClinica%2Fleliseo89%40hotmail.com%2FperfilAdmin.png?alt=media&token=e39b6f0a-da9f-4c8e-81be-f899f5c80f66";
    this.arrayUsuarios.push(admin);

    var esp1 = new Usuario();
    esp1.email = "cheoluquez@gmail.com";
    esp1.password = "123456";
    esp1.img1Url = "https://firebasestorage.googleapis.com/v0/b/lab4-f7591.appspot.com/o/usuariosClinica%2Fcheoluquez%40gmail.com%2FdrNick.jpg?alt=media&token=6a195a49-b873-45ae-b86e-f0239f938b16";
    this.arrayUsuarios.push(esp1);

    var esp2 = new Usuario();
    esp2.email = "rominapuertas91@gmail.com";
    esp2.password = "123456";
    esp2.img1Url = "https://firebasestorage.googleapis.com/v0/b/lab4-f7591.appspot.com/o/usuariosClinica%2Frominapuertas91%40gmail.com%2Fromina.png?alt=media&token=6f8b897f-23c2-497f-a685-ba8179c8160b";
    this.arrayUsuarios.push(esp2);
    
    var pac1 = new Usuario();
    pac1.email = "sara_luquez@hotmail.com";
    pac1.password = "123456";
    pac1.img1Url = "https://firebasestorage.googleapis.com/v0/b/lab4-f7591.appspot.com/o/usuariosClinica%2Fsara_luquez%40hotmail.com%2FLisa.png?alt=media&token=1b304897-034c-406f-ad87-5be89f4ac5f8";
    this.arrayUsuarios.push(pac1);

    var pac2 = new Usuario();
    pac2.email = "alegrepatricia72@gmail.com";
    pac2.password = "123456";
    pac2.img1Url = "https://firebasestorage.googleapis.com/v0/b/lab4-f7591.appspot.com/o/usuariosClinica%2Falegrepatricia72%40gmail.com%2FLane.png?alt=media&token=f01fa0f4-ca81-4700-b70e-f12d726f941b";
    this.arrayUsuarios.push(pac2);

    var pac3 = new Usuario();
    pac3.email = "ismael_luquez@hotmail.com";
    pac3.password = "123456";
    pac3.img1Url = "https://firebasestorage.googleapis.com/v0/b/lab4-f7591.appspot.com/o/usuariosClinica%2Fisma_luquez%40hotmail.com%2Fbart2.jpg?alt=media&token=8aa69214-d841-4445-8714-df9b0fe90cfc";
    this.arrayUsuarios.push(pac3);
    
    var pac4 = new Usuario();
    pac4.email = "animendez181@gmail.com";
    pac4.password = "123456";
    pac4.img1Url = "https://firebasestorage.googleapis.com/v0/b/lab4-f7591.appspot.com/o/usuariosClinica%2Fanimendez181%40gmail.com%2Fmarge2.jpg?alt=media&token=6c1e352b-2227-4062-8628-22c2ec596fed";
    this.arrayUsuarios.push(pac4);

    var pac5 = new Usuario();
    pac5.email = "bernaluquez@hotmail.com";
    pac5.password = "123456";
    pac5.img1Url = "https://firebasestorage.googleapis.com/v0/b/lab4-f7591.appspot.com/o/usuariosClinica%2Fbernaluquez%40hotmail.com%2Fmoe.jpg?alt=media&token=06ddfef7-f8f0-45b7-9fef-23b4f7ee813a";
    this.arrayUsuarios.push(pac5);

    var pac6 = new Usuario();
    pac6.email = "jessica.santillan16@gmail.com";
    pac6.password = "123456";
    pac6.img1Url = "https://firebasestorage.googleapis.com/v0/b/lab4-f7591.appspot.com/o/usuariosClinica%2Fjessica.santillan16%40gmail.com%2Fabe1.png?alt=media&token=b07d279d-32dc-496f-8326-28d3d4e4c85e";
    this.arrayUsuarios.push(pac6);
    

   
  }


}
