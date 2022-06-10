import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {
  usuarioPerfil: Usuario;

  constructor(private authSvc: AuthService) {
    var usuarioAux = this.authSvc.usuario;
    console.log(usuarioAux);

    this.usuarioPerfil = usuarioAux;
    
  }

  ngOnInit(): void {
  }

}
