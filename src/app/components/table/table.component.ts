import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PersonasService } from 'src/app/servicios/personas.service';
import { IApiData } from 'src/app/models/IApiData';
import { AuthService } from 'src/app/servicios/auth.service';

import Swal from 'sweetalert2';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(
    public srvAuth: AuthService,
    public srvDatos: PersonasService,
    private srvToast: NotificacionesService,
  ) { }

  // Creamos la propiedad observable isUserLoggedIn$, será tratada por el pipe async
  isUserLoggedIn$ = this.srvAuth.loggedIn$;

  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  displayedColumns: string[] = ['nombre', 'email', 'salario', 'crud'];
  dataSource = new MatTableDataSource();

  ngOnInit(): void {
    this.srvDatos.getPersonas().subscribe((respuesta: IApiData) => {
      // console.log('respuesta=' + JSON.stringify(respuesta));
      if (respuesta.error) alert(`api error ${respuesta.message}`);
      this.dataSource.data = respuesta.data;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Queres borrar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvDatos.delPersonas(id).subscribe((respuesta: IApiData) => {
          console.log('respuesta=' + JSON.stringify(respuesta));
          if (respuesta.error) this.srvToast.toast('error', ` ${respuesta.message}`, 'ERROR')
          if (!respuesta.error) {
            // this.ngAfterViewInit(); 
            this.ngOnInit();// Reload tabla
            this.srvToast.toast('success', ` ${respuesta.message}`, 'Delete');
          }
        });
      }
    })
  }
  


}
