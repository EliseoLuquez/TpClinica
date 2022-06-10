import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Horarios } from 'src/app/clases/horarios';
import { Usuario } from 'src/app/clases/usuario';
import { HorariosService } from 'src/app/services/horarios.service';

@Component({
  selector: 'app-mis-horarios',
  templateUrl: './mis-horarios.component.html',
  styleUrls: ['./mis-horarios.component.css']
})
export class MisHorariosComponent implements OnInit {

 //@Output() usuarioRegistrado: EventEmitter<any> = new EventEmitter<any>();
 formulario!: FormGroup;
 @Input() usuarioHorarios!: Usuario;
 especialidad!: string;
 horario!: Horarios;
 dia!: string;

 constructor(public fv: FormBuilder, private horarioSvc: HorariosService) {
   this.formulario = fv.group({
     especialidad: ["", Validators.required],
     lunesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     lunesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     martesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     martesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     miercolesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     miercolesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     juevesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     juevesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     viernesHoraDesde: ["", [ this.validarMinutos, this.validarHora]],
     viernesHoraHasta: ["", [ this.validarMinutos, this.validarHora]],
     sabadoHoraDesde: ["", [ this.validarMinutos, this.validarSabadoHora]],
     sabadoHoraHasta: ["", [ this.validarMinutos, this.validarSabadoHora]]

   });

 }

 ngOnInit(): void {
   //console.log(this.usuarioHorarios.especialidades);
 }

 validarMinutos(control: AbstractControl) {
   const nombre = control.value;
   if(nombre != ""){
     var minutos = nombre.split(':')[1];
     var minCero = minutos.includes("00");
     var minTreinta = minutos.includes("30");
     //console.log(minutos);

     if (minCero) {
       return null;
     }

     if (minTreinta) {
       return null;
     }

     if(!minCero && !minTreinta)
     return { minValido: true };
     
   }
   return null;
 }

 validarHora(control: AbstractControl) {
   const nombre = control.value;
   if(nombre != ""){
     var hora = nombre.split(':')[0];
     //console.log(hora);
     
     if (hora <= 8 || hora > 19) {
       return { horaValido: true };
     }
   }
   return null;
 }

 validarSabadoHora(control: AbstractControl) {
   const nombre = control.value;
   if(nombre != ""){
     var hora = nombre.split(':')[0];
     //console.log(hora);
     
     if (hora <= 8 || hora > 14) {
       return { horaValido: true };
     }
   }
   return null;

 }


 registrar() {
   console.log(this.formulario);
   this.horario = new Horarios();
   this.horario.idEspecialista = this.usuarioHorarios.id;
   this.horario.horarioLunes = [{ desde: this.formulario.controls['lunesHoraDesde'].value, hasta: this.formulario.controls['lunesHoraHasta'].value }];
   this.horario.horarioMartes = [{ desde: this.formulario.controls['martesHoraDesde'].value, hasta: this.formulario.controls['martesHoraHasta'].value }];
   this.horario.horarioMiercoles = [{ desde: this.formulario.controls['miercolesHoraDesde'].value, hasta: this.formulario.controls['miercolesHoraHasta'].value }];
   this.horario.horarioJueves = [{ desde: this.formulario.controls['juevesHoraDesde'].value, hasta: this.formulario.controls['juevesHoraHasta'].value }];
   this.horario.horarioViernes = [{ desde: this.formulario.controls['viernesHoraDesde'].value, hasta: this.formulario.controls['viernesHoraHasta'].value }];
   this.horario.horarioSabado = [{ desde: this.formulario.controls['sabadoHoraDesde'].value, hasta: this.formulario.controls['sabadoHoraHasta'].value }];
   
   this.horarioSvc.addHorario(this.horario);
 }



}
