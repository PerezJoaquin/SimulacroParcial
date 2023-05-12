import { Component, Input } from '@angular/core';
import { FiredbService } from 'src/app/servicios/firedb.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent {
  @Input() peliculaDet!:any;
  pelicula:any;
  //peliculaMostrarDet:any = this.peliculaDet;
  constructor(private db:FiredbService){}

  guardar(){
    //this.peliculaDet = this.peliculaMostrarDet;
    //console.log("det", this.peliculaDet)
    this.db.updatePelicula(this.peliculaDet);
  }
}
