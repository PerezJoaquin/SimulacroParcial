import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpReqService {

  constructor(private http: HttpClient) { 
    this.tarerPaises();
  }

  paises:any;
  errorMessage:any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  async tarerPaises() {
    let url = "https://restcountries.com/v3.1/all";
    /*this.http.get<any>(url).subscribe(data => {
        this.paises = data.total;
        console.log(this.paises);
    }) */
    this.http.get(url).subscribe(data => {
      //console.log(data);
      this.paises = data;
      console.log("ser", data);
    });
  }

  mostrarPaises(){
    console.log(this.paises);
  }
}
