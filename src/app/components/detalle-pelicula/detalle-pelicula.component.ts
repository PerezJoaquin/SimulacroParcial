import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent {
  @Input() peliculaDet!:any;
  //peliculaMostrarDet:any = this.peliculaDet;

  guardar(){
    //this.peliculaDet = this.peliculaMostrarDet;
  }
}
