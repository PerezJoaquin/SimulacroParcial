import { Component } from '@angular/core';
import { FiredbService } from './servicios/firedb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'simulacroParcial';

  constructor(private fdb:FiredbService){
    fdb.traerActores();
    fdb.traerPeliculas();
  }

  database = [
    {id:"1",
      nombre:"Scarface",
      tipo:"drama",
      fechaDeEstreno:"09/02/1984",
      cantidadDePublico:"456",
      foto:"scarface.png"
    },{
      id:"2",
      nombre:"Moana",
      tipo:"infantil",
      fechaDeEstreno:"23/11/2016",
      cantidadDePublico:"126",
      foto:"moana.png"
    },{
      id:"3",
      nombre:"Cisne Negro",
      tipo:"suspenso",
      fechaDeEstreno:"17/02/2011",
      cantidadDePublico:"765",
      foto:"cisneNegro.png"
    },{
      id:"4",
      nombre:"Kill Bill",
      tipo:"accion",
      fechaDeEstreno:"27/11/2003",
      cantidadDePublico:"465",
      foto:"killbill.png"
    },
  ]

  strPeliculas = JSON.stringify(this.database);

  result = localStorage.setItem("peliculas", this.strPeliculas);

}
