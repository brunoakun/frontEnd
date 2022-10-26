 import { TableComponent } from './components/table/table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContabilidadComponent } from './components/contabilidad/contabilidad.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [
  { path: 'lista', component: TableComponent, pathMatch: "full" },
  { path: 'contabilidad', component: ContabilidadComponent },  
  { path: 'ventas', component: VentasComponent },   

  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: '**', redirectTo: 'lista', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
