import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {  

  constructor(private toastr: ToastrService) { }

  toast(tipo: string, mensaje: string, titulo?: string) {
    switch (tipo) {
      case 'success':
        this.toastr.success(mensaje, titulo)
        break;
      case 'error':
        this.toastr.error(mensaje, titulo)
        break;
      case 'warning':
        this.toastr.warning(mensaje, titulo)
        break;
      case 'info':
        this.toastr.info(mensaje, titulo)
        break;
    }

  }




}
