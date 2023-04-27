import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.css']
})
export class TablaPeliculaComponent {

  @Output() EviarADetalle : EventEmitter<any> = new EventEmitter<any>();
  peliculas = JSON.parse(localStorage.getItem('peliculas') as string);

  enviarObjeto(pelicula:any){
    this.EviarADetalle.emit(pelicula);
  }
}
