import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  private category : Category;

  
  public cat$ = new Subject<Category[]>();
  public category$ = new Subject<Category>();

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

  deleteCategory(id : String)
  {
    console.log("Avant d'envoyer au back")
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:4000/api/category/' + id).subscribe(
        (response) => {
          console.log("RETOUR DU BACK")
          console.log(response)
          resolve(response);
          this.getAllCategories();
        },
        (error) => {
          reject(error);
        }
      );
    });

  }

  createCategory(cat : Category)
  {
    console.log("CREATE")
    console.log(cat);
    return this.http.post('http://localhost:4000/api/category/', {cat})
            .pipe(map((cat: any) => 
            {
              console.log("SORTIE DE CREATE CAT")
              console.log(cat)
                  this.category = { ...cat };
                  this.category$.next(this.category);

                return cat;
            }));
  }
  
  updateCategory(cat : Category)
  {
    console.log("UPDATE")
    console.log(cat)

    return this.http.patch('http://localhost:4000/api/category/', {cat})
            .pipe(map((cat: any) => 
            {
              console.log("SORTIE DE UPDATE CAT")
              console.log(cat)
              this.category = { ...cat };
              this.category$.next(this.category);
            }));
  }



   getCategoryById(id: string) {
     return new Promise((resolve, reject) => {
       return this.http.get('http://localhost:4000/api/category/' + id).subscribe(
         (response) => {
           console.log(response)
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
    console.log("dans le getAll cat");
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4000/api/category').subscribe(
        (cate : Category[]) => {
          if (cate) {
            this.cat = cate;
            console.log(this.cat);
            resolve(cate);
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