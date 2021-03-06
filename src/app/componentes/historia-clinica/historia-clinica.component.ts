import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  public mostrar: boolean = false;
  public historiaSeleccionada: HistoriaClinica = new HistoriaClinica;
  public usuarioSeleccionado: Usuario = new Usuario;
  public listadoHistoriaClinica: any = [];
  public listaHistoriaClinica: any = [];
  usuario!: any;

  constructor(public historiaClinicaService: HistoriaClinicaService, public authSvc: AuthService, private turnoSvc: TurnoService) {
    this.usuario = this.authSvc.usuarioLogueado;
    console.log(this.usuario);
  }

  ngOnInit(): void {
    this.listadoHistoriaClinica = this.turnoSvc.db.collection("turnos", ref => ref.where('idPaciente', '==', this.usuario.id));
    this.buscarHistoria();
    console.log(this.listaHistoriaClinica);
  }

  buscarHistoria() {
    this.listaHistoriaClinica = new Array<Turno>();
    this.listadoHistoriaClinica.snapshotChanges().pipe(
      map((data: any) => {
        data.map((item: any) => {
          var turno: Turno = new Turno();
          //turno.id = item.payload.doc.id;
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
          //console.log(historia.payload.doc.data().Turno.PacienteEmail);
          turno.historiaClinica.temperatura = item.payload.doc.data().historiaClinica.temperatura;
          turno.historiaClinica.presion = item.payload.doc.data().historiaClinica.presion;
          turno.historiaClinica.altura = item.payload.doc.data().historiaClinica.altura;
          turno.historiaClinica.peso = item.payload.doc.data().historiaClinica.peso;
          turno.historiaClinica.clave1 = item.payload.doc.data().historiaClinica.clave1;
          turno.historiaClinica.clave2 = item.payload.doc.data().historiaClinica.clave2;
          //turno.id = historia.payload.doc.id;
          turno.historiaClinica.valor1 = item.payload.doc.data().historiaClinica.valor1;
          turno.historiaClinica.valor2 = item.payload.doc.data().historiaClinica.valor2;
          //turno.turnoId = turno.payload.doc.data().historiaClinica.turnoId;
          this.listaHistoriaClinica.push(turno);
        })
      })
    ).subscribe((datos: any) => {
    });
  }

  crearPdf() {
    let DATA = <HTMLElement>document.getElementById('pdfTable');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      var nombreArchivo ='historia-clinica.pdf';
      PDF.save(nombreArchivo);
    });
  }
}
