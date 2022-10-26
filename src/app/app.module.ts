import { JwtDecodeService } from './servicios/jwt-decode.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableComponent } from './components/table/table.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NavbarComponent, DialogLogIn } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ContabilidadComponent } from './components/contabilidad/contabilidad.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    NavbarComponent,
    DialogLogIn,
    ContabilidadComponent,
    VentasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableExporterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 5000 
    })

  ],
  providers: [JwtDecodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
