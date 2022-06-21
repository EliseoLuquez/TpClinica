import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';
import { UsuarioService } from './usuario.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuario: any;
  public usu!: Observable<any>;
  public usuario$: Observable<any> = this.afAuth.user;
  public isLoggedIn = false;
  public isLoggedInAdmin = false;
  usuarios: Usuario[] = [];
  msjError: string = "";
  usuarioId!: any;
  usuarioLogueado!: any;

  constructor(public afAuth: AngularFireAuth, private router: Router, private usuarioSvc: UsuarioService) {
    console.log(this.usuarioLogueado);
    this.usuarioSvc.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      afAuth.authState.subscribe(usuario => {
        this.usuarios.forEach(item => {
          if (usuario != null) {

            if (usuario.email == item.email) {
              console.log(item.administrador);
              console.log(this.usuario);
              this.usuario = item;

              if (item.administrador) {
                this.isLoggedInAdmin = true;
              }
              else {
                this.isLoggedInAdmin = false;
              }
              this.isLoggedIn = true;
              //this.usuario.email = usuario.email || "";
              //this.ls.set("usuarioLs", JSON.stringify(this.usuario));
              //this.email = usuario.email || "";
            }
            else {
              this.isLoggedIn = false;
            }
          }
        });
      });
    });
    this.obtenerUsuarioLogueado();
    console.log(this.usuarios);

  }

  //login
  async login(usuario: Usuario) {
    console.log(usuario.email);
    return await this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password).then((result) => {
      this.msjError = "";
      if (result.user) {
        this.usuario = new Usuario();
        this.usuario.id = result.user?.uid;
        this.usuario.email = result.user?.email;
        console.log(result.user);
        if (!result.user?.emailVerified) {
          console.log("email no verificado");
          this.router.navigate(['ingreso/envio-email']);
        }
        else {
          this.router.navigate(['bienvenida']);
        }
      }

    })
      .catch((res) => {
        console.log(res.code);
        if (res.code == "auth/email-already-in-use") {
          this.msjError = "El email ingresado ya esta en uso."
        }
        if (res.code == "auth/invalid-email") {
          this.msjError = "El formato del email no es correcto."
        }
      });

  }

  //register
  async registro(usuario: Usuario): Promise<any> {

    try {
      var result = await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password);
      result.user?.sendEmailVerification();
      return result;
    }
    catch (error) {
      console.log(error);

    }
    // return await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password).then((result) => {
    //   this.msjError = "";
    //   result.user?.sendEmailVerification();
    //   console.log(result);

    // })
    //   .catch((res) => {
    //     console.log(res.message);
    //     if (res.code == "auth/email-already-in-use") {
    //       this.msjError = "El email ingresado ya esta en uso."
    //     }
    //     if (res.code == "auth/invalid-email") {
    //       this.msjError = "El formato del email no es correcto."
    //     }
    //   });
  }


  public async signOut() {
    // this.isLoggedInAdmin = false;
    // this.isLoggedIn = false;
    try {
      await this.afAuth.signOut();
      //this.router.navigate(['/']);
    }
    catch (error) {
      console.log(error);

    }
  }

  async enviarVerficacionEmail() {
    console.log(this.afAuth.currentUser);
    //await this.afAuth.currentUser?.sendEmailVerification();

  }

  verificarAprobacionAdmin(usuario: Usuario) {
    this.usuarios.forEach(item => {
      if (item.email === usuario.email) {
        if (item.habilitado) {
          return true;
        }
        else {
          return false;
        }
      }
      return false;
    });
  }

  obtenerUsuaurioActual() {
    this.afAuth.authState.subscribe(usuario => {
      return usuario;
    });

  }


  obtenerUsuarioLogueado(){
    var usuarios;
    var usuario;
    var email = "";
    this.usuario$.subscribe(result => {
      if(result!= null)
      {
         email = result['email'];
      }
    });
    
    this.usuarioSvc.getUsuarios().subscribe( res => {
      usuarios = res;
      if(usuarios != null){
        usuarios.forEach((element) => {
          if(element.email = email)
          {
            usuario = element;
          }

        });
       
      }
    });
    console.log(usuario);
    
    return usuario;
  
  }
  // public usuario: any;
  // msjError: string = "";

  // constructor(public afAuth: AngularFireAuth, private router: Router, public usuarioSvc: UsuarioService) { }







  // async getUserLogged() {
  //   return this.afAuth.onAuthStateChanged(usuario => {
  //     if(usuario)
  //     {
  //       console.log(usuario);

  //     }
  //   });
  // }

  // logout() {
  //   this.afAuth.signOut();
  // }
}
