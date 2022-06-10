import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent implements OnInit {

  @Output() turnoSeleccionado: EventEmitter<Turno> = new EventEmitter<Turno>();
  @Input() turnos: any[] = [];
  turno: any;

  constructor(public turnoSvc: TurnoService) { }

  ngOnInit(): void {
  }

  asignarTurno(turno: any){
    this.turnoSeleccionado.emit(turno);
  }
}
