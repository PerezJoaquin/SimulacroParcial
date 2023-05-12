import { Component, Output, EventEmitter } from '@angular/core';
import { FiredbService } from 'src/app/servicios/firedb.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-actor-listado',
  templateUrl: './actor-listado.component.html',
  styleUrls: ['./actor-listado.component.css']
})
export class ActorListadoComponent {
  @Output() EnviarActor : EventEmitter<any> = new EventEmitter<any>();
  actores:any;
  actorEnviar:any;
  constructor(private aFirestore: AngularFirestore){
    this.traeractores();
  }

  async traeractores(){
    /*this.fdb.traerActores().then(response => {
      this.actores=response
    });*/
    const col = this.aFirestore.collection('actores');
    col.valueChanges().subscribe((next:any) => {
      console.log(next);
      this.actores = next;
      return next;
    })
  }

  select(actor:any){
    this.actorEnviar = actor;
    console.log("select")
    this.setActor();
  }

  setActor(){
    this.EnviarActor.emit(this.actorEnviar);
    console.log("set")
  }
}
