import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Users } from '../models/user.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  public usrToken$ = new Subject<String>();
  public user$ = new Subject<Users>();

  public static user : Users;

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {

    this.usrToken$.next(token);
    console.log(token + " token de save token") ;
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    window.sessionStorage.getItem(TOKEN_KEY);
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {

    console.log(user + " user de saveUser session");
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user);
    
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return user

    }
    return {};
  }





  


}
