import { TestCommonConstants } from '../../commons/constants.class';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonaModel } from 'src/app/model/persona.model.class';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {

  constructor(private _http: HttpClient) {}

  protected generateBasicHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }    

  savePersona(persona: PersonaModel) {
    return this._http.post<PersonaModel>(TestCommonConstants.pathApi.persona ,  persona , { headers: this.generateBasicHeaders() });
    } 

    consultarEstudiantes() {
      let params = {
        idRol:1
    };    
  
      return this._http.get<any>(TestCommonConstants.pathApi.persona + "/all" , { headers: this.generateBasicHeaders() , params: params });
    }

    consultarProfesores() {
      let params = {
        idRol:2
    };    
  
      return this._http.get<any>(TestCommonConstants.pathApi.persona + "/all" , { headers: this.generateBasicHeaders() , params: params });
    }

    consultarPersona(numeroIdentificacion:String) {
      return this._http.get<any>(TestCommonConstants.pathApi.persona + "/" + numeroIdentificacion , { headers: this.generateBasicHeaders() });
    }    

  

};