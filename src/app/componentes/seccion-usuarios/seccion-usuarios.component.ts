import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent implements OnInit {

  listaUsuarios: any[] = [];
  public usuarioElegido: Usuario = new Usuario();
  registro = false;
  public mostrarDetalle = false;


  constructor() { }

  ngOnInit(): void {
  }

  

  mostrarDatosUsuarioSeleccionado(usuario: any)
  {
    console.log(usuario.img1Url);
    console.log(usuario.img2Url);
    this.usuarioElegido = usuario;
    // this.usuarioElegido.id = usuario.id;
    // this.usuarioElegido.nombre = usuario.nombre;
    // this.usuarioElegido.apellido = usuario.apellido;
    // this.usuarioElegido.email = usuario.email;
    // this.usuarioElegido.tipoUsuario = usuario.tipoUsuario;
    // this.usuarioElegido.administrador = usuario.administrador;
    // this.usuarioElegido.especialista = usuario.especialista;
    // this.usuarioElegido.paciente = usuario.paciente;
    // this.usuarioElegido.habilitado = usuario.habilitado;
    // this.usuarioElegido.img1Url = usuario.img1Url;
    // this.usuarioElegido.img2Url = usuario.img2Url;
    this.mostrarDetalle = true;
 
  }

  mostrarRegistro(){
    this.registro = true;
  }


}
