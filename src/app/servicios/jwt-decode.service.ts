import { Injectable } from '@angular/core';
import * as app from 'jwt-decode';

const jwt_decode = app.default;

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }
  
  DecodeToken(token: string): string {
    return jwt_decode(token);
  }
}
