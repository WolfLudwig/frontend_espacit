import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Users } from '../models/user.model';
import { ResolveEnd } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:3000/api/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class 
AuthService {
  constructor(private http: HttpClient) 
  {
    this.user$ = new BehaviorSubject<any>(this.getUser());
   }

  token$ = new Subject<string>();
  decodedToken$: Subject<String> = new Subject<String>();
  public user$ : BehaviorSubject<any>;
  private decodedToken : String;
  private user : any;

  public static user : Users;
  


  login(email: string, password: string)  
  {
    console.log(" avant d'aller au back " + email + " " + password)
    return new Promise<any>(
      (resolve, reject) => 
      {
        this.http.post(AUTH_API + 'signin', 
        {
          email,
          password
        }, httpOptions).subscribe
        ( 
          (response : any) =>
            {
              console.log(response);
              resolve(response)
              let user = response
              
              //this.user$ = response;
              this.user$.next(user);
              //this.user$.next(response);
              //return this.user$;     
            },
            (error) =>
            {
              reject(error);
            }
        )
      })
    
  }

  getUser() : BehaviorSubject<any>
  {
    console.log(this.user$);
    return this.user$ as BehaviorSubject<any>;
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
       return this.http.get('http://localhost:3000/jwtid/' + 
         token
        , httpOptions)
      .subscribe(
          (response: any) => {
            console.log(response);
            this.decodedToken = response;
            this.emitDecodedToken();
          },
          (error) => {
            return(error);
          }
        );

   }


  emitDecodedToken() {
    this.decodedToken$.next(this.decodedToken);
  }

  checkUser(token : String) : Observable<any>
  {
    console.log(token + " token de checkUser");
      return this.http.get('http://localhost:3000/api/users/userInfos/' + token);

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
