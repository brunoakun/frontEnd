import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/servicios/auth.service';
import { JwtDecodeService } from 'src/app/servicios/jwt-decode.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service'

export interface ILogInData {
  titulo?: string;
  usr: string;
  psw: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usr: string = '';
  psw: string = '';
  token: string = '';

  jwtDAta: any = {};

  constructor(
    public srvAuth: AuthService,
    public dialog: MatDialog,
    private srvToast: NotificacionesService,
    private jwtService: JwtDecodeService

  ) { }

  // Creamos la propiedad observable isUserLoggedIn$, será tratada por el pipe async
  isUserLoggedIn$ = this.srvAuth.loggedIn$;

  ngOnInit(): void {
    // Ya estás validado?
    this.token = sessionStorage.getItem('sprint9.token')!;
    if (this.token) {
      this.jwtDAta = this.jwtService.DecodeToken(this.token);
      console.log(this.jwtDAta.data);

      this.srvAuth.loggedIn.next(true);
      this.srvAuth.rolLevel = this.jwtDAta.data.role
    }
  }

  logInForm(tipo: string) {
    // Pedir datos
    const dialogLogIn = this.dialog.open(DialogLogIn, {
      width: '250px',
      data: { titulo: tipo, usr: this.usr, psw: this.psw },
    });

    dialogLogIn.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');      
      if (result) {
        if (tipo == 'login') this.validaLogIn(result);
        if (tipo == 'newUser') this.creaUsr(result);
      }
    });

  }

  validaLogIn(result: any) {
    this.srvAuth.logIn(result.usr, result.psw).subscribe((respuesta: any) => {
      console.log('respuesta=' + JSON.stringify(respuesta));
      if (respuesta.error) {

        if (typeof respuesta.message === 'object') {
          // más de 1 mensaje
          const claves: string[] = Object.keys(respuesta.message);
          const valores: string[] = Object.values(respuesta.message);
          for (let i = 0; i < claves.length; i++) {
            this.toast('error', valores[i], `ERROR ${claves[i]}`);
          }
        } else {
          // Solo 1 mensaje
          this.toast('error', respuesta.message, `ERROR`);
        }

        return;
      }

      this.token = respuesta.data.token;
      sessionStorage.setItem('sprint9.token', this.token);
      this.toast('success', this.token, 'LogedIn!');
      this.jwtDAta = this.jwtService.DecodeToken(this.token);
      console.log(this.jwtDAta.data);

      this.srvAuth.loggedIn.next(true);
      this.srvAuth.rolLevel = this.jwtDAta.data.role
    });
  }


  creaUsr(result: any) {
    this.srvAuth.newUsr(result.usr, result.psw).subscribe((respuesta: any) => {
      console.log('respuesta=' + JSON.stringify(respuesta));
      if (respuesta.error) {

        if (typeof respuesta.message === 'object') {
          const claves: string[] = Object.keys(respuesta.message);
          const valores: string[] = Object.values(respuesta.message);
          for (let i = 0; i < claves.length; i++) {
            this.toast('error', valores[i], `ERROR ${claves[i]}`);
          }
        } else {
          this.toast('error', respuesta.message, `ERROR`);
        }

        return;
      }
      this.toast('success', respuesta.message, 'Usuario Creado!');
    });
  }



  logOut() {
    this.srvAuth.logOut();
    this.token = '';
    this.jwtDAta = {};
    this.srvAuth.rolLevel = 0;

    this.toast('warning', 'Sesión cerrada', "LogOut");
  }


  toast(t: string, txt: string, tit?: string) {
    this.srvToast.toast(t, txt, tit)
  }



}





@Component({
  selector: 'dialog-login',
  templateUrl: 'dialog-login.html',
})
export class DialogLogIn {
  hide = true;
  constructor(
    public dialogRef: MatDialogRef<DialogLogIn>,
    @Inject(MAT_DIALOG_DATA) public data: ILogInData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
