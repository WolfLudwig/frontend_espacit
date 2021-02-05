import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject, interval, observable, from } from 'rxjs';
import { Ressource } from '../models/ressource.model';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/user.model';
import { DataSource } from '@angular/cdk/table';
import { map, switchMap, tap  } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RessourceService {

constructor(private http: HttpClient) {}

  private ress: Ressource[] = [
    {
        _id : "1234",
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


    
  post$ = new Subject<Ressource[]>();
  comm$ = new Subject<Comment[]>();
  

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
      return this.http.post('http://localhost:3000/api/post', ress).subscribe(
        (ress : Ressource[]) => {
          if (ress) {
            console.log(ress)
            this.emitPosts();
            
          } 
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getAllPosts() {
     return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/post').subscribe(
        (ress: Ressource[]) => {
          if (ress) {
            this.ress = ress;
            this.emitPosts();

          }
        },
        (error) => {
          reject(error);
        }
      );
    });

  }

  getAllPostsObs() {
    return new Promise((resolve, reject) => {
     this.http.get('http://localhost:3000/api/post').subscribe(
       (ress: Ressource[]) => {
         if (ress) {
           this.ress = ress;
           //this.emitPosts();

         }
       },
       (error) => {
         reject(error);
       }
     );
   });

 }




     emitPosts() {
       this.post$.next(this.ress);
     }


  addLike(infos : any)
  {
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:3000/api/post/like', infos).subscribe(
        (response: Ressource) => {
          console.log(response);
          this.ress.forEach(element =>
            {
              
              if(element._id == response._id)
              {

                element.likers =  response.likers;
              }
            })
            this.emitPosts();
          resolve(response);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

  }

  createNewComm(infosComm: any) {
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:3000/api/post/comment-post', infosComm).subscribe(
        (response : Ressource) => {

          this.ress.forEach(element =>
            {
              
              if(element._id == response._id)
              {

                element.comments =  response.comments;
              }
            })
            this.emitPosts();
          
          //this.getAllPosts();
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  askComm(infosComm: any) {
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:3000/api/post/answer-post', infosComm).subscribe(
        (response : Ressource) => {
          console.log(response);
          this.ress.forEach(element =>
            {
              
              
              if(element._id == response._id)
              {

                element.comments =  response.comments;
              }
            })
            this.emitPosts();
          
          //this.getAllPosts();
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getAllPostsByLikes(id : String)
  {
    console.log(id + " id a traiter pour likes ");
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/post/liked-post/'+ id).subscribe(
        (response : Ressource[]) => {
          if(response)
          {
            this.ress = response;
            this.emitPosts();
          }

          
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });

  }



}

