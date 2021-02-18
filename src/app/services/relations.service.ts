import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Relation } from '../models/relation.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelationService {
constructor(private http: HttpClient) {}

  private rel : Relation[] = 
  [
    {
        _id : "1234",
        title : "salut",
        description :"une desc"

    }
  ];

  
  public rel$ = new Subject<Relation[]>();

   getRelationById(idRel: String) {
     console.log(idRel + " avant d'envoyer l'id relation au back")
     return new Promise((resolve, reject) => {
       this.http.get('http://localhost:3000/api/relation/' + idRel).subscribe(
         (response : Relation[]) => {
            console.log(response)
            resolve(response)
            this.rel = response;
            this.emitRelation();

         },
         (error) => {
           reject(error);
         }
       );
     });
   }

   emitRelation() {
    this.rel$.next(this.rel);
    
  }


   getRelationByTitle(title: string) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/relation/' + title).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
   getAllRelations()
  {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/relation').subscribe(
        (rela : Relation[]) => {
          if (rela) {
            this.rel = rela;
            resolve(rela);
            this.emitRelations();
          } 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

  }
  emitRelations() {
    this.rel$.next(this.rel);
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
