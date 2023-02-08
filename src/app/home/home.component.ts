import { PersonaService } from 'src/app/services/persona/persona.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { PersonaModel } from '../model/persona.model.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  text: string = "";

  estudiantesList = new Array<PersonaModel>();
  profesoresList = new Array<PersonaModel>();

  form = new FormGroup({
    tipoIdentificacion: new FormControl('', Validators.required),
    numeroIdentificacion: new FormControl('', [Validators.required,  Validators.pattern("^[0-9]*$")]),
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    rolId: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private _personaService: PersonaService

  ) { }

  ngOnInit() {
    this.disableContentForm();
    this.consultarEstudiantes();
    this.consultarProfesores();
  }

  disableContentForm(){
    this.form.controls.tipoIdentificacion.enable();
    this.form.controls.numeroIdentificacion.enable();
    this.form.controls.nombres.disable();
    this.form.controls.apellidos.disable();
    this.form.controls.rolId.disable();
    this.form.controls.correo.disable();
  }

  enableContentForm(){
    /*this.form.controls.tipoIdentificacion.disable();
    this.form.controls.numeroIdentificacion.disable();*/
    this.form.controls.nombres.enable();
    this.form.controls.apellidos.enable();
    this.form.controls.rolId.enable();
    this.form.controls.correo.enable();
  }

  onSubmit() {
    console.warn(this.form.value);

    this._personaService.savePersona(this.prepareSave())
    .subscribe(data => {

      Swal.fire(
        '¡Éxito!',
        'Se ha registrado correctamente',
        'success'
      );

      this.consultarEstudiantes();
      this.consultarProfesores();
      this.onClean();

    },
      err =>         
     
      Swal.fire(
        `Se ha presentado un error al crear el profesor.`,
        'error'
      )
    );


  }

  prepareSave() {
    const formModel = this.form.value;
    const Persona: PersonaModel = {
      id: 0,
      tipoIdentificacion: formModel.tipoIdentificacion as string,
      numeroIdentificacion: formModel.numeroIdentificacion as string,
      rolId: formModel.rolId as string,
      nombres: formModel.nombres as string,      
      apellidos: formModel.apellidos as string,            
      correo: formModel.correo as string,                  
      activo: true 
    };
    return Persona;
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


  consultarEstudiantes(){
    this._personaService.consultarEstudiantes().subscribe(res => {
      this.estudiantesList = res;
    });
  }

  consultarProfesores(){
    this._personaService.consultarProfesores().subscribe(res => {
      this.profesoresList = res;
    });
  }  

  onClean() {
    this.disableContentForm();

    const btnCreate = document.getElementById('btnCreate') as HTMLButtonElement | null;
    const btnUpdate = document.getElementById('btnUpdate') as HTMLButtonElement | null;
    const btnClean = document.getElementById('btnClean') as HTMLButtonElement | null;
    btnCreate?.setAttribute('disabled', '');
    btnUpdate?.setAttribute('disabled', '');
    btnClean?.setAttribute('disabled', '');

    this.form.controls.tipoIdentificacion.setValue("");
    this.form.controls.numeroIdentificacion.setValue("");
    this.form.controls.nombres.setValue("");
    this.form.controls.apellidos.setValue("");
    this.form.controls.rolId.setValue("");
    this.form.controls.correo.setValue("");
  }

  verifyChangesId(event: any){
    this.text = event.target.value;
    
    if (this.form.controls.tipoIdentificacion.valid && this.form.controls.numeroIdentificacion.valid){
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

  searchDocument(){

    const btnCreate = document.getElementById('btnCreate') as HTMLButtonElement | null;
    const btnUpdate = document.getElementById('btnUpdate') as HTMLButtonElement | null;
    const btnClean = document.getElementById('btnClean') as HTMLButtonElement | null;    

      //Activar inputs
      const numeroDocumento = this.form.value.numeroIdentificacion;

      if(numeroDocumento != null && numeroDocumento != "" ){

        this._personaService.consultarPersona(numeroDocumento).subscribe(res => {
             if(res != null){

              Swal.fire(
                `${numeroDocumento}`,
                `El número de documento se encuentra registrado.`,
                'success'
              );

              btnCreate?.setAttribute('disabled', '');
              btnUpdate?.setAttribute('enabled', '');
              btnClean?.setAttribute('enabled', '');


              this.form.controls.nombres.setValue(res['nombres']);
              this.form.controls.apellidos.setValue(res['apellidos']);
              this.form.controls.correo.setValue(res['correo']);              


             }else{

              // no encontro usuario entonces se permite el registro

               Swal.fire(
                `${numeroDocumento}`,
                `No se ha encontrado No. Documento registrado`,
                'success'
              );               

              this.enableContentForm();

              btnCreate?.setAttribute('enabled', '');
              btnUpdate?.setAttribute('disabled', '');
              btnClean?.setAttribute('enabled', '');              

               /*this.isUpdate = false;
               this.isSave = true;*/

             }
        });

      }



  }

}

