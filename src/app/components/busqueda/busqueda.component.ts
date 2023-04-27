import { Component } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  peliculaMostrar=[];

  pasarDetalle($event:any){

    this.peliculaMostrar = $event;
    console.log(this.peliculaMostrar)
  }
}
