import { TableComponent } from './components/table/table.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';

const routes: Routes = [
  { path: 'lista', component: TableComponent },
  { path: 'persona/:id', component: TarjetaComponent },  // Parámetro 'id' 

  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: '**', redirectTo: 'lista', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
