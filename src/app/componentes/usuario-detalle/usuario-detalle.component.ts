import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-detalle',
  templateUrl: './usuario-detalle.component.html',
  styleUrls: ['./usuario-detalle.component.css']
})
export class UsuarioDetalleComponent implements OnInit {

  @Input() usuarioDetalle: Usuario = new Usuario();

  constructor(private usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    
  }

  habilitarEspecialista(){
    console.log(this.usuarioDetalle);
    
    this.usuarioDetalle.habilitado = true;
    this.usuarioSvc.updateUsuarioEspecialista(this.usuarioDetalle);

  }

}
