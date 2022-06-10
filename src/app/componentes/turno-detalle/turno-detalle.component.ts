import { Component, Input, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent implements OnInit {

  @Input() turnoDetalle!: any;
  aceptado = "ACEPTADO";
  rechazado = "RECHAZADO";
  cancelado = "CANCELADO";
  finalizado = "FINALIZADO";
  pendiente = "PENDIENTE";
  realizado = "REALIZADO";

  constructor(private turnoSvc: TurnoService) { }

  ngOnInit(): void {
  }

  cancelar(){
    this.turnoDetalle.estado = this.cancelado;
    this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  rechazar(){
    this.turnoDetalle.estado = this.rechazado;
    this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  aceptar(){
    this.turnoDetalle.estado = this.aceptado;
    this.turnoSvc.updateTurno(this.turnoDetalle);
  }

  finalizar(){
    this.turnoDetalle.estado = this.finalizado;
    this.turnoSvc.updateTurno(this.turnoDetalle);
  }


}
