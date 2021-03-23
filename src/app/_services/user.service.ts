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

  private myFriends : Users[] = [
    {
      _id: '324sdfmoih3',
      pseudo: 'Mon objet',
      email: 'A propos de mon objet',
      password: 4900,
      picture: "..\assets\images\avatars.jpg",
      bio: "je me présente",
      friend: ["String"],
      likes:  ["String"] ,
      status : true,
      role : "User"
    },
  ];

  public usr : Users[];
  public usr$ = new Subject<Users[]>();
  public frd$ = new Subject<Users[]>();

  constructor(private http: HttpClient) { }

  addFriend(idFriend : String, idUser : String)
  {
    console.log( "j'entre avec idFriend : " + idFriend + " idUser : " + idUser );
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:4000/accounts/friend/', {idFriend, idUser}).subscribe(
        (response : Users[]) => {
          this.getAllFriends(idUser);
          resolve(response); 

        },
        (error) => {
          reject(error);
        }
      );
    });

  }

  deleteFriend(idFriend : String, idUser : String)
  {
  
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:4000/accounts/unFriend/', {idFriend, idUser}).subscribe(
        (response : Users[]) => {
          
          resolve(response);
          this.getAllMyFriends(idUser)

           
        },
        (error) => {
          reject(error);
        }
      );
    });

  }

  getAllMyFriends(idUser : String)
  {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4000/accounts/friendsList/' + idUser ).subscribe(
        (friends : Users[]) => {
          if (friends) {
            resolve(friends);
            this.myFriends = friends;
            console.log(this.myFriends);
            this.emitMyFriends();
            
          } 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

  }

  getAllFriends(idUser : String)
  {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4000/accounts/myFriends/' + idUser ).subscribe(
        (friends : Users[]) => {
          if (friends) {
            resolve(friends);
            this.myFriends = friends;
            console.log(this.myFriends);
            this.emitMyFriends();
            
          } 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  emitMyFriends() {
    this.frd$.next(this.myFriends);
  }

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

  getAllUsers(id : String)
  {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4000/api/users/distinct/' + id).subscribe(
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
