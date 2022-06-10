import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  usuarios:any = [];
  usuario!: any;
  public filter!: string;
  turnosOcupados: any;
  turnoSeleccionado!: Turno;

  constructor(private turnoSvc: TurnoService, private usuarioSvc: UsuarioService, private authSvc: AuthService) { 
    this.cargarUsuarios();
    //this.cargarTurnos();
   
    console.log(this.usuario);
    if(this.usuario.id)
    {
      this.turnosOcupados = this.turnoSvc.db.collection("turnos", ref => ref.where('idPaciente', '==', this.usuario.id));
      console.log(this.turnosOcupados);
    }
    
  }

  ngOnInit(): void {

  }

  cargarTurnos() {
    this.turnoSvc.getTurnos().subscribe(turnos => {
      this.turnosOcupados = turnos;
      console.log(turnos);
      
    });
  }

  asignarTurno(turno:any) {
    console.log(turno);
    // var data = especialidad;
    this.turnoSeleccionado = turno;

  }

  cargarUsuarios() {
    this.usuarioSvc.getUsuarios().subscribe((usuarios: any) => {
      this.usuarios = usuarios;
      this.authSvc.afAuth.onAuthStateChanged(user => {
        if (user) {
          //console.log(user);
          this.usuario.email = user.email;
          this.getUsuario();
        }
      });
      //console.log(usuarios);
    });
  }

  getUsuario() {
    this.usuarios.forEach((item: Usuario) => {
      if (this.usuario.email == item.email) {
        this.usuario = item;
        //console.log(this.usuario);
      }
    })
  }

}
