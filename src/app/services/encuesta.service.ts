import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Turno } from '../clases/turno';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

  dbPath: string = "encuestaClinica";
  encuestaCollection!: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore, public router: Router, public afAuth: AngularFireAuth) {
    this.encuestaCollection = this.db.collection<any>(this.dbPath, ref => ref.orderBy('fecha','desc'));
   }

   addEncuesta(turno: any, pregUno:string, pregDos:string, pregTres:string){
    // console.log(id);
    // console.log(email);
    // console.log(nombre);
    
    this.encuestaCollection.add({
      //id: id,
      turno: turno,
      pregUno: pregUno,
      pregDos: pregDos,
      pregTres: pregTres,
      fecha: new Date().toLocaleDateString()
    });
   }
}
