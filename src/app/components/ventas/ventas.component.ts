import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

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

  async isLogedIn() {
    await this.srvAuth.loggedIn$.subscribe(result => {
      return (result);
    });
  }

}
