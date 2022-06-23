import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { MiPerfilComponent } from './componentes/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './componentes/mis-turnos/mis-turnos.component';
import { SeccionUsuariosComponent } from './componentes/seccion-usuarios/seccion-usuarios.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { IngresoModule } from './modulos/ingreso/ingreso.module';
import { SolicitarTurnosComponent } from './componentes/solicitar-turnos/solicitar-turnos.component';
import { MisTurnosEspecialistaComponent } from './componentes/mis-turnos-especialista/mis-turnos-especialista.component';
import { PacientesComponent } from './componentes/pacientes/pacientes.component';

const routes: Routes = [
  {path: 'bienvenida', component: BienvenidaComponent},
  {path: 'seccionUsuarios', component: SeccionUsuariosComponent},
  {path: '', redirectTo:'bienvenida', pathMatch:'full'},
  {path: 'miPerfil', component: MiPerfilComponent},
  {path: 'turnos', component: TurnosComponent},
  {path: 'misTurnos', component: MisTurnosComponent},
  {path: 'misTurnosEspecialista', component: MisTurnosEspecialistaComponent},
  {path: 'solicitarTurno', component: SolicitarTurnosComponent},
  {path: 'pacientes', component: PacientesComponent},
  // {path: 'busqueda', component: BusquedaComponent},
  {path: 'ingreso', loadChildren: () => import('./modulos/ingreso/ingreso.module').then(m => IngresoModule)},
  // {path: 'actor', loadChildren: () => import('./modulos/actor/actor.module').then(m => ActorModule)},
  // {path: 'pipes', component: PipesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
