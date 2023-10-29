import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CompteService } from './compte.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  endpoint: string = environment.apiUrl + "/login";

  jwt:string
  username:string
  roles:Array<string>
  constructor(private http:HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private compteService: CompteService){
  }
  
  login(data){
    return this.http.post(this.endpoint, data,{observe:'response'})
  }
  
  hasAnyRole(roles: string[]) {    
    for (const role of this.roles) {
      if (roles.includes(role)) {
        return true;
      }
    }
    return false;
  }

  saveToken(jwt: string) {
    sessionStorage.setItem('token',jwt);
    this.jwt=jwt;
    this.parseJWT();
  }

  parseJWT() {
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.jwt);
    if(objJWT){
      this.username = objJWT.sub;
      this.roles = objJWT.roles;      
    }
  }
  getUsername(){
    this.loadToken();
    return this.username
  }
  isAuthenticated(){
    this.loadToken();
    return this.roles && this.hasAnyRole(this.roles);
  }

  loadToken() {
    this.jwt = sessionStorage.getItem('token');
    this.parseJWT()
  }

  logOut() {
    sessionStorage.removeItem('token')
    this.initParams()
  }
  initParams(){
    this.jwt=undefined
    this.username=undefined
    this.roles=undefined
  }
}
