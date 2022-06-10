import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from "@angular/fire/compat/database";
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { EnvioEmailComponent } from './componentes/envio-email/envio-email.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { ListaUsuarioComponent } from './componentes/lista-usuario/lista-usuario.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { SolicitarTurnosComponent } from './componentes/solicitar-turnos/solicitar-turnos.component';
import { UsuarioDetalleComponent } from './componentes/usuario-detalle/usuario-detalle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngresoModule } from './modulos/ingreso/ingreso.module';
import { TablaTurnosComponent } from './componentes/tabla-turnos/tabla-turnos.component';
import { TurnoDetalleComponent } from './componentes/turno-detalle/turno-detalle.component';
import { MisHorariosComponent } from './componentes/mis-horarios/mis-horarios.component';
import { ListaEspecialistasComponent } from './componentes/lista-especialistas/lista-especialistas.component';
import { ListaPacientesComponent } from './componentes/lista-pacientes/lista-pacientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AltaUsuarioComponent } from './componentes/alta-usuario/alta-usuario.component';
import { AltaEspecialidadComponent } from './componentes/alta-especialidad/alta-especialidad.component';
import { ListaEspecialidadComponent } from './componentes/lista-especialidad/lista-especialidad.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BienvenidaComponent,
    EnvioEmailComponent,
    SeccionUsuariosComponent,
    ListaUsuarioComponent,
    MiPerfilComponent,
    MisTurnosComponent,
    TurnosComponent,
    SolicitarTurnosComponent,
    UsuarioDetalleComponent,
    TablaTurnosComponent,
    TurnoDetalleComponent,
    MisHorariosComponent,
    ListaEspecialistasComponent,
    ListaPacientesComponent,
    LoginComponent,
    RegistroComponent,
    AltaUsuarioComponent,
    AltaEspecialidadComponent,
    ListaEspecialidadComponent,
    SolicitarTurnosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IngresoModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
