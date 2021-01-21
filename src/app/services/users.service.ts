import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Users } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

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

  private myFriends : Users[] = [
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

   getUser(id : String) {
     this.http.get('http://localhost:3000/api/users'+ id).subscribe(
       (stuff: Users[]) => {
         if (stuff) {
           this.usr = stuff;
           console.log("je suis dans getUser");
           console.log(this.usr);
           this.emitUser();
         }
       },
       (error) => {
         console.log(error);
       }
     );
   }

  emitUser() {
    this.usr$.next(this.usr);
  }

  getUsers(id : String[]) {
    this.http.get('http://localhost:3000/api/users/infos'+ id).subscribe(
      (stuff: Users[]) => {
        if (stuff) {
          this.usr = stuff;
          console.log("je suis dans getUsers");
          console.log(this.usr);
          this.emitUser();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }



//   getUserById(id: string) {
//     return new Promise((resolve, reject) => {
//       this.http.get('http://localhost:3000/api/users/' + id).subscribe(
//         (response) => {
//           resolve(response);
//         },
//         (error) => {
//           reject(error);
//         }
//       );
//     });
//   }

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

  signInUser(usr : Users)
  {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/users/signIn', usr).subscribe(
        (response) => {
          resolve(response); 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

  }

  getAllUsers()
  {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/users').subscribe(
        (friends : Users[]) => {
          if (friends) {
            this.usr = friends;
            console.log(friends);
            this.emitFriends();
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

  getAllFriends(id : string)
  {
    console.log(id + " identifiant récupéré ");
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/users/myFriends/'+ id).subscribe(
        (friends : Users[]) => {
          if (friends) {
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

  isLog()
  {
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
