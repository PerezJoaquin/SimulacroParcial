import { Component, Output, EventEmitter } from '@angular/core';
import { FiredbService } from 'src/app/servicios/firedb.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tabla-pelicula',
  templateUrl: './tabla-pelicula.component.html',
  styleUrls: ['./tabla-pelicula.component.css']
})
export class TablaPeliculaComponent {

  @Output() EviarADetalle : EventEmitter<any> = new EventEmitter<any>();
  //peliculas = JSON.parse(localStorage.getItem('peliculas') as string);
  peliculas:any;
  constructor(private db :FiredbService, private aFirestore:AngularFirestore){
    this.traerPeli();
  }

  enviarObjeto(pelicula:any){
    this.EviarADetalle.emit(pelicula);
  }

  async traerPeli(){
    const col = this.aFirestore.collection('peliculas');
    col.valueChanges().subscribe((next:any) => {
      console.log(next);
      this.peliculas = next;
    })
  }
}
