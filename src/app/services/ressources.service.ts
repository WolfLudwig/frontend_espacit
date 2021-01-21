import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, interval } from 'rxjs';
import { Ressource } from '../models/ressource.model';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/user.model';

const source = interval(1000);

@Injectable({
  providedIn: 'root'
})
export class RessourceService {
constructor(private http: HttpClient) {}

  private ress: Ressource[] = [
    {
        posterId: "1234",
        posterPseudo : "LaCrème",
        message: "String",
        picture:  "assets/images/logo-light-icon.png",
        video:  "",
        likers: [{ _id: "5ff2f561f3831a54b42fce83",
            pseudo: "la crème",
            email: "lacreme@gmail.com"}],
        comments: [{commenterId : "5ff2f561f3831a54b42fce83",
         commenterPseudo : "laCrème", text :"c'est un commentaire ! "}],
        relation : [{_id :"1234", title :"1 relation", description :"une description de rel "}],       
        category : {_id : "1234", title :"1 catégorie", description :"une description de cat"},
        ressourceType : [{_id :"1234", title :"1 type de ressource", description :"une description de ress "}]
      
    }
  ];

  private user: Users[] = [];
    
  public post$ = new Subject<Ressource[]>();
  public usr$ = new Subject<Users[]>();
  currentPost$ = this.post$.asObservable();

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

   getAllPosts()
   {
     return new Promise((resolve, reject) => {
       this.http.get('http://localhost:3000/api/post').subscribe(
         (ress : Ressource[]) => {
           if (ress) {
             this.ress = ress;
             this.emitPosts();
             
           } 
         },
         (error) => {
           console.log(error);
           reject(error);
         }
       );
     });

   }

     emitPosts() {
      // this.currentPost$.subscribe(this.post$);
       this.post$.next(this.ress);
     }

   emitUsersInfos() {
    this.usr$.next(this.user);
  }

  addLike(ress : Ressource)
  {
    console.log("dans le addLike avec id : " + ress);
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:3000/api/post/like', ress).subscribe(
        (response) => {
          resolve(response);  
        },
        (error) => {
          reject(error);
        }
      );
    });

  }

  createNewComm(infosComm : String[]) {
    console.log(infosComm);
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:3000/api/post/comment-post', infosComm).subscribe(
        (response) => {
          console.log(response + " reponse du back");
          resolve(response);
          
        },
        (error) => {
          reject(error);
        }
      );
    });
  }


}

