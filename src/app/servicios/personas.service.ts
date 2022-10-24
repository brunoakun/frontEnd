import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiData } from '../models/IApiData';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  //Propiedades   
  apiURL: string = environment.apiURL;

  //Constructor
  constructor(private http: HttpClient) { }

  //Métodos
  getPersonas(): Observable<IApiData> {
    return this.http.get<IApiData>(`${this.apiURL}/personas/list`);
  }
}

