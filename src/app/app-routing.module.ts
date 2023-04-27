import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ActorAltaComponent } from './components/actor-alta/actor-alta.component';
import { ActorListadoComponent } from './components/actor-listado/actor-listado.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { PeliculaAltaComponent } from './components/pelicula-alta/pelicula-alta.component';
import { PeliculaListadoComponent } from './components/pelicula-listado/pelicula-listado.component';

const routes: Routes = [
  {path: "actor/alta", component:ActorAltaComponent},
  {path: "actor/listado", component:ActorListadoComponent},
  {path: "bienvenido", component:BienvenidoComponent},
  {path: "busqueda", component:BusquedaComponent},
  {path: "pelicula/alta", component:PeliculaAltaComponent},
  {path: "actor/listado", component:PeliculaListadoComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
