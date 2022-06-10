import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/clases/turno';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {

  turnosOcupados: any;
  turnoSeleccionado!: Turno;

  constructor(private turnoSvc: TurnoService) { 
    this.cargarTurnos();
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
    //this.getEspecialistas();
    //this.especialidadesSeleccionadas.push(especialidad);
    //this.formulario.controls['especialidades'].setValue(this.especialidadesSeleccionadas);

  }
}
