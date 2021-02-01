import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Users } from '../models/user.model';

const AUTH_API = 'http://localhost:3000/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  token$ = new Subject<String>();
  private token : String;



   login(email: string, password: string): Observable<any> {
     return this.http.post(AUTH_API + 'signIn', {
       email,
       password
     }, httpOptions)
     
   }



  register(pseudo: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      pseudo,
      email,
      password
    }, httpOptions);
  }

   public decodeToken(token : String) : any
   {
     let promise =  new Promise((resolve, reject) => {
       this.http.get(AUTH_API + 'jwtid/' + 
         token
       , httpOptions).subscribe(
         (response: any) => {

           console.log(response);
           this.token = response;
           this.emitToken();
         },
         (error) => {
           reject(error);
         }
       );
     });
   }

   emitToken() {
    this.token$.next(this.token);
  }

  // public decodeToken(token : String): any{
  //   return this.http.get(AUTH_API + 'jwtid/' + 
  //   token
  // ,{ responseType: 'text' }).subscribe(resp) =>
  // {
  //   this.usr = resp
  // };
  // }

}
