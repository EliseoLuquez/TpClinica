import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, Observable } from 'rxjs';
import { Imagen } from '../clases/imagen';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //public usuario$: Observable<any> = this.authSvc.afAuth.user;
  dbPathUsuarios: string = "usuariosClinica";
  dbPathEspecialidades: string = "especialidades";

  usuariosCollection!: AngularFirestoreCollection;
  usuarios!: Observable<Usuario[]>;

  especialidadesCollection!: AngularFirestoreCollection;
  especialidades!: Observable<any[]>;

  usuarioId!: any;
  usuarioLogueado!: any;

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {
    this.cargarUsuarios();
    this.cargarEspecialidades();
    

    
    
  }

  getUsuario = (uid: any): Observable<any> => {
    return this.db.collection(this.dbPathUsuarios).doc(uid).get();
  }


  addUsuario(usuario: Usuario, img: Imagen) {
    console.log(this.usuariosCollection);
    this.usuariosCollection.add({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      DNI: usuario.DNI,
      email: usuario.email,
      password: usuario.password,
      tipoUsuario: usuario.tipoUsuario,
      obraSocial: usuario.obraSocial,
      especialidad: usuario.especialidades,
      administrador: usuario.administrador,
      especilista: usuario.especialista,
      paciente: usuario.paciente,
      img1Nombre: img.nombre,
      img1Url: img.url,
    });
  }

  cargarUsuarios() {
    this.usuariosCollection = this.db.collection(this.dbPathUsuarios);
    this.usuarios = this.usuariosCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Usuario;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  onUpload(filePath: string, file: any) {
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }

  uploadUsuarioImg(img: Imagen, usuario: Usuario): Observable<any> {
    const filePath = `${this.dbPathUsuarios}/${img.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, img.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          img.url = downloadURL;
          img.nombre = img.file.name;
          this.addUsuario(usuario, img);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  deleteFile(img: Imagen): void {
    this.deleteFileStorage(img.nombre);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.dbPathUsuarios);
    storageRef.child(name).delete();
  }

  updateUsuario(usuario: Usuario) {
    const tutorialsRef = this.db.collection(this.dbPathUsuarios);
    tutorialsRef.doc(usuario.id).update({ aprobado: usuario.especialista });
  }

  updateUsuarioEspecialista(usuario: Usuario) {
    const tutorialsRef = this.db.collection(this.dbPathUsuarios);
    tutorialsRef.doc(usuario.id).update({ habilitado: usuario.habilitado });
  }

  getUsuarios() {
    return this.usuarios;
  }

  cargarEspecialidades() {
    this.especialidadesCollection = this.db.collection(this.dbPathEspecialidades);
    this.usuarios = this.usuariosCollection.snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Usuario;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
    this.especialidades = this.especialidadesCollection.snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        return data;
      });
    }));
    console.log(this.especialidadesCollection);
  }

  addEspecilidad(especialidad: string){
    this.especialidadesCollection.add({
      nombre: especialidad
    });
  }

  getEspecialidades(){
    return this.especialidades;
  }

  // private dbPath: string = '/usuarios';
  // public usuario: Usuario = new Usuario();
  // usuariosRef!: AngularFirestoreCollection<any>;
  // usuarioData: any;
  // userMail!: string;
  // usuarios!: Observable<any[]>;

  // constructor(private firestoreDb: AngularFirestore) {
  //   this.usuariosRef = firestoreDb.collection<any>(this.dbPath);
  //   this.getUsuarios();
  // }

  // getUsuarios() {
  //   this.usuarios = this.usuariosRef.snapshotChanges().pipe(
  //     map(actions => actions.map(a => a.payload.doc.data() as any))
  //   )
  // }

  // getUsuarioById(id: string) {
  //   let usuarioRef = this.firestoreDb.collection(this.dbPath, ref => ref.where(id, '==', 'id'));
  //   return usuarioRef;
  // }

  // registrarUsuario(usuario: any, id: string) {
  //   this.usuariosRef.add(
  //     {
  //       email: usuario.email,
  //       fecha: new Date().toLocaleString(),
  //       id: id
  //     });
  // }
}
