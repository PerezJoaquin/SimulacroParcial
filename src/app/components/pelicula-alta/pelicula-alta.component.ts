import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FiredbService } from 'src/app/servicios/firedb.service';
import Swal from 'sweetalert2';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-pelicula-alta',
  templateUrl: './pelicula-alta.component.html',
  styleUrls: ['./pelicula-alta.component.css']
})


export class PeliculaAltaComponent {

  
  public forma!: FormGroup;
  peli!:Pelicula;

  model!: NgbDateStruct;
	date!: { year: number; month: number};
  
  peliculaNombre!:string;
  peliculaTipo!:string;
  peliculaFecha!:string;
  peliculaPublico!:number;
  peliculaFoto!:string;

  actores:any;
  actorPasado:any;

  actornombre!:string;
  downloadURL!: Observable<string>;
  fbimg:any;
  newimage='';

  showbar=false;
  //selectedFile: File = null;

  constructor(private http:HttpClient, private fbd:FiredbService, private fb: FormBuilder, private calendar: NgbCalendar, private storage:AngularFireStorage){
    console.log(fbd.traerActores());
    this.forma = this.fb.group({
      'nombre': ['', Validators.required],
      'tipo': ['', Validators.required],
      'fecha': ['', [Validators.required]],
      'actor': new FormControl({value:'', disabled: true}, [Validators.required]),
      'publico': ['', Validators.required],
    });
    console.log(this.forma);
    this.peli = new Pelicula();
  }
  
  async guardar(){
    this.showbar=true;
    this.peli.nombre = this.peliculaNombre;
    this.peli.tipo = this.peliculaTipo;
    this.peli.fecha = this.getfecha();
    this.peli.actor = this.actorPasado;
    this.peli.publico = this.peliculaPublico;
      console.log(this.peli)
    if(await this.fbd.guardarPelicula(this.peli)){
      Swal.fire({
        title: 'Éxito!',
        text: 'La pelcula ha sido guardado con éxito',
        icon: 'success',
        confirmButtonText: 'OK!'
      })
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Ocurrió un error al guardar la pelicula',
        icon: 'error',
        confirmButtonText: 'OK!'
      })
    }
    console.log(this.peli)
    this.showbar=false;
    
  }

  pasarActor($event:any){
    this.actorPasado = $event;
    this.actornombre = this.actorPasado.nombre+" "+this.actorPasado.apellido;
    this.forma.value.actor = this.actornombre;
    //console.log(this.forma.value)
  }

  updateDate(){
    this.peliculaFecha = this.model.day+"/"+this.model.month+"/"+this.model.year;
    this.forma.value.fecha = this.peliculaFecha;
    //console.log(this.peliculaFecha)
  }

  getfecha(){
    this.peliculaFecha = this.model.day+"/"+this.model.month+"/"+this.model.year;
    return this.peliculaFecha;
  }

  onFileSelected(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload=( (image)=>{
     
          this.newimage = image.target!.result as string;

      })
      reader.readAsDataURL(event.target.files[0])
    }
    const file = event.target.files[0];
    this.peli.foto = file;
    /*const filePath = `peliculas/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`peliculas/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fbimg = url;
            }
            console.log(this.fbimg);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });*/
  }
}

class Pelicula{
  nombre!:string;
  tipo!:string;
  fecha!:string;
  actor:any;
  foto:any;
  publico!:number; 
}