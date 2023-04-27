import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioActualService {

  usuarioActivo:string;

  constructor() { 
    this.usuarioActivo = "nadie";
  }
}
