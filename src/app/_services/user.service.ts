// TODO A supprimer plus tard, inutile.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Users } from '../models/user';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public usr : Users[];
  public usr$ = new Subject<Users[]>();

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getAllUsers()
  {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4000/api/users').subscribe(
        (friends : Users[]) => {
          if (friends) {
            this.usr = friends;
            this.emitFriends();
            resolve(friends)
          } 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

  }
  emitFriends() {
    this.usr$.next(this.usr);
  }

}
