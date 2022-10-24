import { PersonasService } from 'src/app/servicios/personas.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  // Creamos el obserbable loggegIn$, como un boolean=false
  loggedIn = new BehaviorSubject<boolean>(false);

  //Propiedades   
  apiURL: string = environment.apiURL;
  public loggedIn$ = this.loggedIn.asObservable();
  public token: string = '';

  constructor(
    private ruta: Router,
    private http: HttpClient
  ) { }

  logIn(usr: string, psw: string) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    const body = {};
    const params = new HttpParams()
      .append('email', usr)
      .append('password', psw);

    return this.http.post<any>(`${this.apiURL}/login`, body, {
      headers: headers,
      params: params,
    });
  }

  logOut(): void {
    this.loggedIn.next(false);
    this.redirectToHome();
  }

  redirectToHome() {
    this.ruta.navigate(['/']);
  }

}
