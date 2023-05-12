import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiredbService } from 'src/app/servicios/firedb.service';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-actor-alta',
  templateUrl: './actor-alta.component.html',
  styleUrls: ['./actor-alta.component.css']
})
export class ActorAltaComponent {

  public forma!: FormGroup;
  
  actorNombre!:string;
  actorApellido!:string;
  actorPais!:string;
  actorEdad!:number;
  actorFoto!:string;

  paises:any;
  url = 'https://restcountries.com/v3.1/all';
  paisPasado:any;
    
  constructor(private http:HttpClient, private fbd:FiredbService, private fb: FormBuilder){
    console.log(this.treaerPaises());
    this.forma = this.fb.group({
      'nombre': ['', Validators.required],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.max(99)]],
      'pais': new FormControl({value:'', disabled: true}, [Validators.required]),
    });
    console.log(this.forma);

  }
  


  treaerPaises(){
    this.http.get(this.url).subscribe(data => {
      this.paises = data;
      console.log("bien", data);
    });
  }
  
  guardar(){
    console.log({nombre: this.actorNombre,
      apellido:this.actorApellido,
      nacionalidad: this.actorPais,
      edad:this.actorEdad});
    if(this.fbd.guardarActor({nombre: this.actorNombre,
                          apellido: this.actorApellido,
                          nacionalidad: this.actorPais,
                          edad: this.actorEdad})){
      Swal.fire({
        title: 'Éxito!',
        text: 'El actor ha sido guardado con éxito',
        icon: 'success',
        confirmButtonText: 'OK!'
      })
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Ocurrió un erro guardando el actor',
        icon: 'error',
        confirmButtonText: 'OK!'
      })
    }
    
  }

  pasarPais($event:any){
    this.paisPasado = $event;
    this.actorPais = this.paisPasado.name.common;
  }
  

}
