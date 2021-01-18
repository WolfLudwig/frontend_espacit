import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ressource } from '../models/ressource.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
constructor(private http: HttpClient) {}

  private ress: Ressource[] = [
    {
        posterId: "1234",
        message: "String",
        picture:  "assets/images/logo-light-icon.png",
        video:  "",
        likers: [{ _id: "5ff2f561f3831a54b42fce83",
            pseudo: "la crème",
            email: "lacreme@gmail.com",
            password: null}],
        comments: ["String"],
        relation : [{_id :"1234", title :"1 relation", description :"une description"}],       
        category : "String",
        ressourceType : ["String"],
      
    }
  ];

  
  public post$ = new Subject<Ressource[]>();

//   getUser() {
//     this.http.get('http://localhost:3000/api/post').subscribe(
//       (stuff: Users[]) => {
//         if (stuff) {
//           this.usr = stuff;
//           alert("je suis dans getUser");
//           this.emitUser();
//         }
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//   }



   getPostById(id: string) {
     return new Promise((resolve, reject) => {
       this.http.get('http://localhost:3000/api/post/' + id).subscribe(
         (response) => {
           resolve(response);
         },
         (error) => {
           reject(error);
         }
       );
     });
   }

  createNewPost(ress: Ressource) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/post', ress).subscribe(
        (response) => {
          resolve(response);
          
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  

//   getAllUsers()
//   {
//     return new Promise((resolve, reject) => {
//       this.http.get('http://localhost:3000/api/users').subscribe(
//         (friends : Users[]) => {
//           if (friends) {
//             this.usr = friends;
//             console.log(friends);
//             this.emitFriends();
//           } 
//         },
//         (error) => {
//           console.log(error);
//           reject(error);
//         }
//       );
//     });

//   }


//   emitFriends() {
//     this.usr$.next(this.usr);
//   }

//   getAllFriends(id : string)
//   {
//     console.log(id + " identifiant récupéré ");
//     return new Promise((resolve, reject) => {
//       this.http.get('http://localhost:3000/api/users/myFriends/'+ id).subscribe(
//         (friends : Users[]) => {
//           if (friends) {
//             this.myFriends = friends;
//             console.log(this.myFriends);
//             this.emitMyFriends();
//           } 
//         },
//         (error) => {
//           console.log(error);
//           reject(error);
//         }
//       );
//     });
//   }

//   emitMyFriends() {
//     this.frd$.next(this.myFriends);
//   }



}
