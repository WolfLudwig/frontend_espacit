import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Users } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private usr: Users[] = [
    {
      _id: '324sdfmoih3',
      pseudo: 'Mon objet',
      email: 'A propos de mon objet',
      password: 4900,
    },
    {
      _id: '324sdfmoih3',
      pseudo: 'Mon objet 2',
      email: 'A propos de mon objet 2',
      password: 49000,
    },
  ];

  private myFriends: Users[] = [
    {
      _id: '324sdfmoih3',
      pseudo: 'Mon objet',
      email: 'A propos de mon objet',
      password: 4900,
    },
    {
      _id: '324sdfmoih3',
      pseudo: 'Mon objet 2',
      email: 'A propos de mon objet 2',
      password: 49000,
    },
  ];
  public usr$ = new Subject<Users[]>();
  public frd$ = new Subject<Users[]>();

  getUser(id: string) {
    this.http.get('http://localhost:3000/api/users' + id).subscribe(
      (stuff: Users[]) => {
        if (stuff) {
          this.usr = stuff;
          this.emitUser();
        }
      },
      (error) => {
      }
    );
  }

  emitUser(): void {
    this.usr$.next(this.usr);
  }

  getUsers(id: string[]) {
    this.http.get('http://localhost:3000/api/users/infos' + id).subscribe(
      (stuff: Users[]) => {
        if (stuff) {
          this.usr = stuff;
          this.emitUser();
        }
      },
      (error) => { }
    );
  }

  createNewUser(usr: Users) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/users', usr).subscribe(
        (response) => {
          resolve(response);

        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  signInUser(usr: Users) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/users/signIn', usr).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });

  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/users').subscribe(
        (friends: Users[]) => {
          if (friends) {
            this.usr = friends;
            this.emitFriends();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });

  }


  emitFriends(): void {
    this.usr$.next(this.usr);
  }

  getAllFriends(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/users/myFriends/' + id).subscribe(
        (friends: Users[]) => {
          if (friends) {
            this.myFriends = friends;
            this.emitMyFriends();
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  emitMyFriends(): void {
    this.frd$.next(this.myFriends);
  }

  isLog() {
    return new Promise<boolean>((resolve, reject) => {
      this.http.get('http://localhost:3000/api/users/isLog').subscribe(
        () => {
          resolve(true);
        },
        () => {
          reject(false);
        }
      );
    });
  }
}
