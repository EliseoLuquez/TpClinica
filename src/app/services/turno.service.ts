import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  dbPathTurnos: string = "turnos";

  turnosCollection!: AngularFirestoreCollection;
  turnos!: Observable<Turno[]>;

  constructor(public db: AngularFirestore) { 
    this.cargarTurnos()
  }

  cargarTurnos() {
    this.turnosCollection = this.db.collection(this.dbPathTurnos);
    this.turnos = this.turnosCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Turno;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  getTurnos() {
    return this.turnos;
  }

  addTurno(turno: Turno):any {
    console.log(turno);
    this.turnosCollection.add({
      id:"",
      idEspecialista: turno.idEspecialista,
      idPaciente: turno.idPaciente,
      estado: turno.estado,
      paciente: turno.paciente,
      especialista: turno.especialista,
      especialidad: turno.especialidad,
      fecha: turno.fecha,
      hora: turno.hora,
      comentariosPaciente: turno.comentariosPaciente,
      comentariosEspecialista: turno.comentariosEspecialista
    
    });
  }

  updateTurno(turno: Turno) {
    const tutorialsRef = this.db.collection(this.dbPathTurnos);
    tutorialsRef.doc(turno.id).update(turno);
  }

  updateTurnoEstado(turno: Turno) {
    const tutorialsRef = this.db.collection(this.dbPathTurnos);
    tutorialsRef.doc(turno.id).update({estado: turno.estado});
  }

  updateTurnoEstadoComentariosPaciente(turno: Turno) {
    const tutorialsRef = this.db.collection(this.dbPathTurnos);
    tutorialsRef.doc(turno.id).update({estado: turno.estado, comentariosPaciente: turno.comentariosPaciente});
  }

  updateTurnoEstadoComentariosEspecialista(turno: Turno) {
    const tutorialsRef = this.db.collection(this.dbPathTurnos);
    tutorialsRef.doc(turno.id).update({estado: turno.estado, comentariosEspecialista: turno.comentariosEspecialista});
  }

  updateTurnoEstadoComentariosAdmin(turno: Turno) {
    const tutorialsRef = this.db.collection(this.dbPathTurnos);
    tutorialsRef.doc(turno.id).update({estado: turno.estado, comentariosAdmin: turno.comentariosAdmin});
  }
}
