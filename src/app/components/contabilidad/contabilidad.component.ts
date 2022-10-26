import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-contabilidad',
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.scss']
})
export class ContabilidadComponent implements OnInit {

  constructor(
    public srvAuth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.srvAuth.rolLevel < 1) {
      alert("No tienes acceso :-(");
      this.router.navigate(['/login'])
    }
  }

}
