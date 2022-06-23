import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { TurnoService } from 'src/app/services/turno.service';

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
    this.listadoHistoriaClinica = this.turnoSvc.db.collection("turnos", ref => ref.where('turno.especialistaId', '==', this.usuario.id));
    this.buscarHistoria();
    console.log(this.listaHistoriaClinica);
  }

  ngOnInit(): void {
  }

  buscarHistoria() {
    this.listaHistoriaClinica = new Array<HistoriaClinica>();
    this.listadoHistoriaClinica.snapshotChanges().pipe(
      map((data: any) => {
        data.map((turno: any) => {
          var history: HistoriaClinica = new HistoriaClinica();
          //console.log(historia.payload.doc.data().Turno.PacienteEmail);
          history.temperatura = turno.payload.doc.data().historiaClinica.temperatura;
          history.presion = turno.payload.doc.data().historiaClinica.presion;
          history.altura = turno.payload.doc.data().historiaClinica.altura;
          history.peso = turno.payload.doc.data().historiaClinica.peso;
          history.clave1 = turno.payload.doc.data().historiaClinica.clave1;
          history.clave2 = turno.payload.doc.data().historiaClinica.clave2;
          //history.id = historia.payload.doc.id;
          history.valor1 = turno.payload.doc.data().historiaClinica.valor1;
          history.valor2 = turno.payload.doc.data().historiaClinica.valor2;
          history.turnoId = turno.payload.doc.data().historiaClinica.turnoId;
          this.listaHistoriaClinica.push(history);
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
