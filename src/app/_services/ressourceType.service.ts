import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RessourceType } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RessourceTypeService {
constructor(private http: HttpClient) {}

  private typeRess : RessourceType[] = 
  [
    {
        _id : "1234",
        title : "salut",
        description :"une desc"

    },
  ];

  
  public rsType$ = new Subject<RessourceType[]>();



   getRessourceTypeById(id: string) {
     return new Promise((resolve, reject) => {
       this.http.get('http://localhost:4000/ressourceType/' + id).subscribe(
         (response) => {
           resolve(response);
         },
         (error) => {
           reject(error);
         }
       );
     });
   }

   getAllRessourceTypes()
  {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4000/api/ressourceType').subscribe(
        (ress : RessourceType[]) => {
          if (ress) {
            this.typeRess = ress;
            console.log(this.typeRess);
            resolve(ress);
            this.emitRessourceType();
          } 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

  }
  emitRessourceType() {
    this.rsType$.next(this.typeRess);
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