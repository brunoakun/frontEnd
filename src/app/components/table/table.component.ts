import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PersonasService } from 'src/app/servicios/personas.service';
import { IApiData } from 'src/app/models/IApiData';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(public srvDatos: PersonasService) { }

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  displayedColumns: string[] = ['nombre', 'email', 'salario', 'created_at'];
  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    this.srvDatos.getPersonas().subscribe((respuesta: IApiData) => {
      console.log('respuesta=' + JSON.stringify(respuesta));
      if (respuesta.error) alert(`api error ${respuesta.error}`);
      this.dataSource.data = respuesta.data;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
