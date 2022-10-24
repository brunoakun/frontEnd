import { IPersona } from './../../models/IPersona';
import { IApiData } from './../../models/IApiData';
import { PersonasService } from './../../servicios/personas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.scss']
})
export class TarjetaComponent implements OnInit {

  public listaPersonas: IPersona[] = [];

  constructor(public srvDatos: PersonasService) { }

  ngOnInit(): void { 

  }

}
