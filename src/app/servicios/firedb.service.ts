import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiredbService {

  constructor(private aFirestore:AngularFirestore, private storage:AngularFireStorage) { }

  usercol!:any;
  actorescol:any;
  peliculascol:any;

  guardar(update: any){
    // const col = this.aFirestore.collection('usuarios');
    // const documento = this.aFirestore.doc('usuarios/'+this.aFirestore.createId());
    // documento.set({
    //   id:documento.ref.id,
    //   nombre: "Fernando",
    //   apellido: "fernandez",
    //   edad: 30,
    // });
  }

  traer(){
    const col = this.aFirestore.collection('usuarios');
    col.valueChanges().subscribe((next:any) => {
      console.log(next);
    })
  }

  traerPeliculas(){
    const col = this.aFirestore.collection('peliculas');
    col.valueChanges().subscribe((next:any) => {
      console.log(next);
      this.peliculascol = next;
      return next;
    })
  }

  updatePelicula(update: any){
    const documento = this.aFirestore.doc('peliculas/'+update.id);
    documento.update(update);
    //documento.update({})
  }

  delete(id:string){
    const documento  = this.aFirestore.doc('usuarios/'+id);
    documento.delete();
  }

  guardarActor(actor:any){
    const col = this.aFirestore.collection('actores');
    const documento = this.aFirestore.doc('actores/'+this.aFirestore.createId());
    documento.set({
      id:documento.ref.id,
      nombre: actor.nombre,
      apellido: actor.apellido,
      edad: actor.edad,
      nacionalidad: actor.nacionalidad,
    });
    return true;
  }

  guardarUsuario(usuario:any){
    const col = this.aFirestore.collection('usuarios');
    const documento = this.aFirestore.doc('usuarios/'+this.aFirestore.createId());
    documento.set({
      id:documento.ref.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      edad: usuario.edad,
      sexo: usuario.sexo,
      email: usuario.email,
    });
  }

  traerUsuarios(){
    this.usercol = this.aFirestore.collection('usuarios');
    this.usercol.valueChanges().subscribe((next:any) => {
      console.log(next);
    })
  }

  async traerActores(){
    
    const col = this.aFirestore.collection('actores');
    col.valueChanges().subscribe((next:any) => {
      console.log(next);
      this.actorescol = next;
      return next;
    })
  }

  async guardarPelicula(pelicula:any){
    const immgurl = await this.guardarFoto(pelicula);
    
    const col = this.aFirestore.collection('peliculas');
    const documento = this.aFirestore.doc('peliculas/'+this.aFirestore.createId());
    documento.set({
      id:documento.ref.id,
      nombre: pelicula.nombre,
      actor: pelicula.actor,
      tipo: pelicula.tipo,
      cantidadDePublico: pelicula.publico,
      foto:immgurl,
      fechaDeEstreno: pelicula.fecha,
    });
    return true;
  }

  async guardarFoto(pelicula:any){
    /*var n = Date.now();
    //let downloadURL: Observable<string>;
    //let fbimg="";
    const filePath = `peliculas/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`peliculas/${n}`, pelicula.foto);*/
    /*task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url: any) => {
            const res = url;
            resolve(res) ;
            if (url) {
              fbimg = url;
              
            }
            //return fbimg;
          });
        })
      )
      .subscribe((url: any) => {
        if (url) {
          console.log(url);

        }
      });*/

      return new Promise(resolve=>{
        var n = Date.now();
        const filePath = `peliculas/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`peliculas/${n}`, pelicula.foto);
        task.snapshotChanges().pipe(
          finalize(()=>{
            fileRef.getDownloadURL().subscribe((res: any) => {
              const url = res;
              resolve(url);
              return;
            })
          })
        ).subscribe();
      });
      
  }

}
