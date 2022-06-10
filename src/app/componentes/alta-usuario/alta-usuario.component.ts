import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Imagen } from 'src/app/clases/imagen';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  public usuarioLog$: Observable<any> = this.authSvc.afAuth.user;
  public formulario!: FormGroup;
  usuario!: Usuario;
  img1Perfil!: Imagen;
  img2Perfil!: Imagen;
  selectedFiles!: FileList;
  percentage!: number;
  especialista = false;
  paciente = false;
  administrador = false;
  msjError!: string;
  tipoUsuario!: string;
  especialidades: any = [];
  especialidadSeleccionada: any = [];
  especialidadesSeleccionadas: any = [];
  //usuarios = [];

  constructor(public fv: FormBuilder, private authSvc: AuthService, private usuarioSvc: UsuarioService, private router: Router) {
    this.formulario = fv.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      edad: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ["", Validators.required],
      email: ["", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ["", Validators.required],
      tipoUsuario: ["", Validators.required],
      obraSocial: ["",],
      especialidades: ["",],
      img1Perfil: ["", Validators.required],
      img2Perfil: ["",]
    });

    console.log(this.usuarioLog$);

    //this.usuarioSvc.cargarEspecialidades();
  }

  ngOnInit(): void {
    this.cargarEspecialidades();
  }

  getTipoUsuario() {
    console.log(this.tipoUsuario);
    switch (this.tipoUsuario) {
      case "Administrador":
        this.administrador = true;
        this.especialista = false;
        this.paciente = false;
        break;
      case "Especialista":
        this.administrador = false;
        this.especialista = true;
        this.paciente = false;
        break;
      case "Paciente":
        this.administrador = false;
        this.especialista = false;
        this.paciente = true;
        break;
    }
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles);

  }


  async registrar() {

    console.log(this.formulario);
    this.usuario = new Usuario();
    this.usuario.nombre = this.formulario.controls['nombre'].value;
    this.usuario.apellido = this.formulario.controls['apellido'].value;
    this.usuario.edad = this.formulario.controls['edad'].value;
    this.usuario.DNI = this.formulario.controls['dni'].value;
    this.usuario.email = this.formulario.controls['email'].value;
    this.usuario.password = this.formulario.controls['password'].value;
    this.usuario.tipoUsuario = this.formulario.controls['tipoUsuario'].value;
    this.usuario.obraSocial = this.formulario.controls['obraSocial'].value;
    if (this.usuario.especialista || this.usuario.administrador) {
      this.usuario.obraSocial = "";
    }
    //this.usuario.especialidades = this.formulario.controls['especialidades'].value;
    this.usuario.especialidades = this.especialidadesSeleccionadas;
    this.usuario.administrador = this.administrador;
    this.usuario.especialista = this.especialista;
    this.usuario.paciente = this.paciente;

    if (this.usuario.paciente || this.usuario.administrador) {
      this.usuario.especialidades = [];
    }

    if (this.usuario.especialista) {
      this.usuario.habilitado = false;

    }
    else {
      this.usuario.habilitado = true;
    }

    this.authSvc.registro(this.usuario).then(async (result) => {
      //this.usuario.logueado = true;
      //this.usuario.fecha = new Date().toLocaleString();
      //await this.authSvc.enviarVerficacionEmail();
      this.msjError = "";
    })
      .catch((res) => {
        if (res.message == "The email address is already in use by another account.") {
          this.msjError = "El email ingresado ya esta en uso."
        }
        if (res.message == "The email address is badly formatted.") {
          this.msjError = "El formato del email no es correcto."
        }
      });

    console.log(this.usuario);

    const file1 = this.selectedFiles.item(0);
    const file2 = this.selectedFiles.item(1);
    //this.selectedFiles = undefined;
    if(file1 != null){
      this.img1Perfil = new Imagen(file1);
    }
    if(file2 != null){
      this.img2Perfil = new Imagen(file2);
    }
    console.log(this.usuario);

    //TODO: cambiar nombres de fotos porq no guarda la img si se llama igual
    this.usuarioSvc.uploadUsuarioImg(this.img1Perfil, this.usuario).subscribe(
      ( percentage: number) => {
        this.percentage = Math.round(percentage);
      },
      ( error: any) => {
        console.log(error);
      }
    );

    this.router.navigate(['ingreso/envio-email']);
  }

  
  cargarEspecialidades() {
    this.usuarioSvc.getEspecialidades().subscribe((especialidades: any) => {
      this.especialidades = especialidades;
      console.log(this.especialidades);
      
    });
  }

  asignarEspecialidadSeleccionada(especialidad: any){
    console.log(especialidad.nombre);
    ;
  
    this.especialidadSeleccionada = especialidad;
    this.especialidadesSeleccionadas.push(this.especialidadSeleccionada.nombre);
    console.log(this.especialidadesSeleccionadas)
    this.formulario.controls['especialidades'].setValue(this.especialidadesSeleccionadas);
  }

  //   validarEspecialista(control: AbstractControl){
  //     const especialista = control.value;
  //     const 
  //   } 
  //   validarNombre(control: AbstractControl){
  //     const nombre = control.value;
  //     const tieneEspacio = nombre.includes(' ');
  //     if(tieneEspacio){
  //       return { tieneEspacio: true };
  //     }
  //     return null;
  //   }
  // @Output() usuario!: Usuario;
  // formulario!: FormGroup;
  // img1Perfil!: Imagen;
  // selectedFiles!: FileList;
  // percentage!: number;
  // msjError!: string;

  // constructor(public fv: FormBuilder, private authSvc: AuthService, private usuarioSvc: UsuarioService, private router: Router) {
  //   this.formulario = fv.group({
  //     nombre: ["", Validators.required],
  //     apellido: ["", Validators.required],
  //     edad: ["", [Validators.required, Validators.min(18), Validators.max(99)]],
  //     dni: ["", Validators.required],
  //     email: ["", [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  //     password: ["", Validators.required],
  //     img1Perfil: ["", Validators.required]
  //   });
  // }
  
  // ngOnInit(): void {
  // }

  // async registrar() {

  //   console.log(this.formulario);
  //   this.usuario = new Usuario();
  //   this.usuario.nombre = this.formulario.controls['nombre'].value;
  //   this.usuario.apellido = this.formulario.controls['apellido'].value;
  //   this.usuario.edad = this.formulario.controls['edad'].value;
  //   this.usuario.DNI = this.formulario.controls['dni'].value;
  //   this.usuario.email = this.formulario.controls['email'].value;
  //   this.usuario.password = this.formulario.controls['password'].value;
  //   this.usuario.tipoUsuario = "Administrador";
  //   this.usuario.obraSocial = "";
  //   this.usuario.especialidad = "";
  //   this.usuario.administrador = true;
  //   this.usuario.especialista = false;
  //   this.usuario.paciente = false;
  //   this.usuario.habilitado = true;
  

  //   this.authSvc.registro(this.usuario).then(async (result) => {
  //     //this.usuario.logueado = true;
  //     //this.usuario.fecha = new Date().toLocaleString();
  //     //await this.authSvc.enviarVerficacionEmail();
  //     this.msjError = "";
  //   })
  //     .catch((res) => {
  //       if (res.message == "The email address is already in use by another account.") {
  //         this.msjError = "El email ingresado ya esta en uso."
  //       }
  //       if (res.message == "The email address is badly formatted.") {
  //         this.msjError = "El formato del email no es correcto."
  //       }
  //     });

  //   console.log(this.usuario);

  //   const file1 = this.selectedFiles.item(0);
  //   const file2 = this.selectedFiles.item(1);
  //   //this.selectedFiles = undefined;
  //   if(file1 != null)
  //   {
  //     this.img1Perfil = new Imagen(file1);
  //   }
    
  //   console.log(this.usuario);

  //   //TODO: cambiar nombres de fotos porq no guarda la img si se llama igual
  //   this.usuarioSvc.uploadUsuarioImg(this.img1Perfil, this.usuario).subscribe(
  //     percentage => {
  //       this.percentage = Math.round(percentage);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );

  //   this.router.navigate(['ingreso/envio-email']);
  // }

  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  //   console.log(this.selectedFiles);

  // }

}
