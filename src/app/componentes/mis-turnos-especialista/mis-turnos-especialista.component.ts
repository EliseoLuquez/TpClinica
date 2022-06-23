import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mis-turnos-especialista',
  templateUrl: './mis-turnos-especialista.component.html',
  styleUrls: ['./mis-turnos-especialista.component.css']
})
export class MisTurnosEspecialistaComponent implements OnInit {

  usuarios: any = [];
  usuario: Usuario = new Usuario;
  public filter!: string;
  turnosOcupados: any;
  turnoSeleccionado!: Turno;
  turnosPaciente: any;
  turnosEspecialista: any;
  historiasClinicas: any;
  historias: any;
  mostrarAltaHistoria: boolean =  true;
  turnosHistoria: any;
  public listadoHistoriaClinica: any = [];
  public listaHistoriaClinica: any = [];

  constructor(private turnoSvc: TurnoService, private usuarioSvc: UsuarioService, private authSvc: AuthService, private historiaClinicaSvc: HistoriaClinicaService) {
    this.usuario = this.authSvc.usuarioLogueado;
    

  }

  ngOnInit(): void {

    console.log(this.usuario);

    if (this.usuario != null) {
      this.turnosOcupados = this.turnoSvc.db.collection("turnos", ref => ref.where('idEspecialista', '==', this.usuario.id));
      this.cargarTurnos();
    }
  }


  cargarTurnos() {
    // this.turnoSvc.getTurnos().subscribe(turnos => {
    //   this.turnosOcupados = turnos;
    // });

    this.turnosOcupados.snapshotChanges().pipe(
      map((data: any) => {
        this.turnosPaciente = new Array<Turno>();
        data.map((item: any) => {
          console.log(item);
          //var turno = item;
          var turno = new Turno();
          turno.id = item.payload.doc.id;
          turno.idEspecialista = item.payload.doc.data().idEspecialista;
          turno.idPaciente = item.payload.doc.data().idPaciente;
          turno.estado = item.payload.doc.data().estado;
          //turno.paciente = new Usuario();
          turno.paciente = item.payload.doc.data().paciente;
          turno.especialista = item.payload.doc.data().especialista;
          turno.especialidad = item.payload.doc.data().especialidad;
          turno.fecha = item.payload.doc.data().fecha;
          turno.hora = item.payload.doc.data().hora;
          turno.comentariosPaciente = item.payload.doc.data().comentariosPaciente;
          turno.comentariosEspecialista = item.payload.doc.data().comentariosEspecialista;
          turno.comentariosAdmin = item.payload.doc.data().comentariosAdmin;
          turno.historiaClinica = item.payload.doc.data().historiaClinica;
          this.turnosPaciente.push(turno);
          console.log(this.turnosPaciente);
        })
      })
    ).subscribe();
    console.log(this.turnosPaciente);
  }

  asignarTurno(turno: any) {
    // console.log(turno);
    // // var data = especialidad;
    // this.turnoSeleccionado = turno;
    // this.historiasClinicas = this.historiaClinicaSvc.firestore.collection("historiaClinica", ref => ref.where('turnoId', '==', this.turnoSeleccionado.id)).snapshotChanges().pipe(
    //   map((data: any) => {
    //      this.historias = new Array<HistoriaClinica>();
    //     data.map((item: any) => {
    //       console.log(item);
    //       //var turno = item;
    //       var historia = new HistoriaClinica();
    //       //turno.id = item.payload.doc.id;
    //       historia.altura = item.payload.doc.data().altura;
    //       historia.peso = item.payload.doc.data().peso;
    //       historia.presion = item.payload.doc.data().presion;
    //       //historia.paciente = new Usuario();
    //       historia.temperatura = item.payload.doc.data().temperatura;
    //       historia.clave1 = item.payload.doc.data().clave1;
    //       historia.clave2 = item.payload.doc.data().clave2;
    //       historia.turnoId = item.payload.doc.data().turnoId;

    //       this.historias.push(historia);
    //       console.log(this.historias);
    //       if(this.historias != null)
    //       {
    //         this.mostrarAltaHistoria = false;
    //       }
    //     })
    //   })
    // ).subscribe();
    //   console.log(this.historias);
    
    this.turnoSeleccionado = turno;
    console.log(this.turnoSeleccionado.historiaClinica);
    console.log(turno.historiaClinica);
    
    if(turno.historiaClinica != ""){
      console.log("oculto");
      
      this.mostrarAltaHistoria = false;
    }
    else{
      console.log("muestro");
      this.mostrarAltaHistoria = true;
    }
  }


}


