import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  text: string = "";

  form = new FormGroup({
    tipoId: new FormControl('', Validators.required),
    numeroId: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern("^[0-9]*$")]),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    rol: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() { }

  ngOnInit() {
    this.disableContentForm();
  }

  disableContentForm(){
    this.form.controls.tipoId.enable();
    this.form.controls.numeroId.enable();
    this.form.controls.nombres.disable();
    this.form.controls.apellidos.disable();
    this.form.controls.rol.disable();
    this.form.controls.correo.disable();
  }

  enableContentForm(){
    this.form.controls.tipoId.disable();
    this.form.controls.numeroId.disable();
    this.form.controls.nombres.enable();
    this.form.controls.apellidos.enable();
    this.form.controls.rol.enable();
    this.form.controls.correo.enable();
  }

  onSubmit() {
    console.warn(this.form.value);

    Swal.fire(
      '¡Excelente!',
      'Se ha creado el usuario',
      'success'
    ).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })
  }

  onUpdate() {    
    console.warn(this.form.value);

    Swal.fire(
      '¡Excelente!',
      'Se ha actualizado el usuario',
      'success'
    ).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      }
    })
  }

  onClean() {
    this.disableContentForm();

    const btnCreate = document.getElementById('btnCreate') as HTMLButtonElement | null;
    const btnUpdate = document.getElementById('btnUpdate') as HTMLButtonElement | null;
    const btnClean = document.getElementById('btnClean') as HTMLButtonElement | null;
    btnCreate?.setAttribute('disabled', '');
    btnUpdate?.setAttribute('disabled', '');
    btnClean?.setAttribute('disabled', '');

    this.form.controls.tipoId.setValue("");
    this.form.controls.numeroId.setValue("");
    this.form.controls.nombres.setValue("");
    this.form.controls.apellidos.setValue("");
    this.form.controls.rol.setValue("");
    this.form.controls.correo.setValue("");
  }

  verifyChangesId(event: any){
    this.text = event.target.value;
    
    if (this.form.controls.tipoId.valid && this.form.controls.numeroId.valid){
      console.log(this.text) // El número de documento

      // Se encontro el usuario
      // Activa el otro formulario
      Swal.fire(
        '¡Excelente!',
        'Se ha encontrado al usuario',
        'success'
      )

      this.enableContentForm();
    }
  }

}
