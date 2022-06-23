import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoriaClinica } from 'src/app/clases/historia-clinica';
import { Turno } from 'src/app/clases/turno';
import { HistoriaClinicaService } from 'src/app/services/historia-clinica.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-alta-historia-clinica',
  templateUrl: './alta-historia-clinica.component.html',
  styleUrls: ['./alta-historia-clinica.component.css']
})
export class AltaHistoriaClinicaComponent implements OnInit {

  @Input() turno: any;
  formulario: FormGroup;
  //TurnoSeleccionado!: any;
  orderObj!: any;
  //public Turno: any;

  @Input() TurnoAMostrar: any = "";
  
  constructor(public fb: FormBuilder, public routeActivate: ActivatedRoute, public historiaClinicaService: HistoriaClinicaService, public route: Router, private turnoSvc: TurnoService) {
    this.formulario = fb.group({
      Altura: ["", Validators.required],
      Peso: ["", Validators.required],
      Temperatura: ["", [Validators.required, Validators.min(34), Validators.max(45)]],
      Presion: ["", [Validators.required]],
      Clave1: ["", Validators.required],
      Valor1: ["", Validators.required],
      Clave2: ["", Validators.required],
      Valor2: ["", Validators.required],

    })
    //this.turnosOcupados = this.turnoSvc.db.collection("turnos", ref => ref.where('idEspecialista', '==', this.usuario.id));

    
    //this.TurnoSeleccionado = JSON.parse(this.routeActivate.snapshot.params['turnito']);
    // console.log(this.TurnoSeleccionado.Horario);


  }

  ngOnInit(): void {
    // this.TurnoSeleccionado = JSON.parse(this.routeActivate.snapshot.params['turnito']);
    // console.log(this.TurnoSeleccionado.Horario);
    // const ob =this.routeActivate.paramMap.subscribe(params => { 
    //    console.log(params);
    //     this.TurnoSeleccionado = params.get('turno'); 

    // });
  }
  // ngOnChanges(changes: SimpleChanges): void {

  //   this.TurnoSeleccionado = JSON.parse(this.routeActivate.snapshot.params['turnito']);
  //   console.log(this.TurnoSeleccionado.Horario);
  // }
  
  aceptar() {
    const historia = new HistoriaClinica();
    historia.altura = this.formulario.controls['Altura'].value;
    historia.peso = this.formulario.controls['Peso'].value;
    historia.temperatura = this.formulario.controls['Temperatura'].value;
    historia.presion = this.formulario.controls['Presion'].value;
    historia.clave1 = this.formulario.controls['Clave1'].value;
    historia.valor1 = this.formulario.controls['Valor1'].value;
    historia.clave2 = this.formulario.controls['Clave2'].value;
    historia.valor2 = this.formulario.controls['Valor2'].value;
    //historia.turnoId = this.turno.id;
    console.log(this.formulario.value);

    //this.historiaClinicaService.guardarHistoriaClinica(historia);
    this.formulario.reset();

    this.turnoSvc.updateTurnoHistoriaClinica(historia, this.turno.id);
  }

}