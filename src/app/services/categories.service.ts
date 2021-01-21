import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
constructor(private http: HttpClient) {}

  private cat : Category[] = 
  [
    {
        _id : "1234",
        title : "salut",
        description :"une desc"

    },
  ];

  
  public cat$ = new Subject<Category[]>();

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



   getCategoryById(id: string) {
     return new Promise((resolve, reject) => {
       this.http.get('http://localhost:3000/api/category/' + id).subscribe(
         (response) => {
           resolve(response);
         },
         (error) => {
           reject(error);
         }
       );
     });
   }

   getAllCategories()
  {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/category').subscribe(
        (cate : Category[]) => {
          if (cate) {
            this.cat = cate;
            console.log(this.cat);
            this.emitCategories();
          } 
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

  }
  emitCategories() {
    this.cat$.next(this.cat);
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
