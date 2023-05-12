import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FiredbService } from 'src/app/servicios/firedb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public forma!: FormGroup;

  constructor(private fb: FormBuilder, private fdb:FiredbService){
    this.forma = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'sexo': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'terminos': ['', Validators.required]
    });
    this.fdb.traerUsuarios();

  }

  registrar(){
    this.fdb.guardarUsuario(this.forma.value)
    //
    this.forma = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      'sexo': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'terminos': ['', Validators.required]
    });
    Swal.fire({
      title: 'Éxito!',
      text: 'El usuario se guardadó con éxito',
      icon: 'success',
      confirmButtonText: 'OK!'
    })
  }

  // CUSTOM VALIDATOR
  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');
    /*if(spaces){
      return{contiene:true};
    }else
    {null;}
*/
    return spaces
      ? { containsSpaces: true }
      : null;
  }
}
