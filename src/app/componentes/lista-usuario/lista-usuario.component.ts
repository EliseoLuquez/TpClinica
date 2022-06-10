import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  @Output() usuarioSeleccionado: EventEmitter<any> = new EventEmitter<any>();
  @Input() usuarios: Usuario[] = [];
  usuario!: Usuario;

 
  constructor(public usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios()
  }


  cargarUsuarios(){
    this.usuarioSvc.getUsuarios().subscribe((usuarios:any) => {
      this.usuarios = usuarios;
      //console.log(usuarios);
    });
  }

  mostrarUsuario(usuario: any){
    this.usuarioSeleccionado.emit(usuario);
  }
}
