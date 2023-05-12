import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tabla-paises',
  templateUrl: './tabla-paises.component.html',
  styleUrls: ['./tabla-paises.component.css']
})
export class TablaPaisesComponent {
  @Output() EnviarPais : EventEmitter<any> = new EventEmitter<any>();
  paises:any;
  url = 'https://restcountries.com/v3.1/all';
  paisMandar:any;
    
  constructor(private http:HttpClient/*, private httpR:HttpReqService*/){
    console.log(this.treaerPaises());
  }

  treaerPaises(){
    this.http.get(this.url).subscribe(data => {

      this.paises = data;
      //console.log("bien", data);
    });
  }

  setPais(){
    this.EnviarPais.emit(this.paisMandar);
    console.log("set")
  }

  select(pais:any){
    this.paisMandar = pais;
    console.log("select")
    this.setPais();
  }
}
