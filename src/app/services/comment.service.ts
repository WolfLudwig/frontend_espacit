import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
constructor(private http: HttpClient) {}

  private comm: Comment[] = [
    {

        commenterId : "5ff2f561f3831a54b42fce83",
        commenterPseudo : "laCrème", 
        text :"c'est un commentaire ! ",  
    }
  ];

  private user: Users[] = [];
    
  
  public com$ = new Subject<Comment[]>();
  currentCom$ = this.com$.asObservable();
  



  createNewComm(infosComm : String[]) {
    console.log(infosComm);
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:3000/api/post/comment-post', infosComm).subscribe(
        (response) => {
          resolve(response);
          
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  

   getAllComments()
   {
     return new Promise((resolve, reject) => {
       this.http.get('http://localhost:3000/api/post').subscribe(
         (com : Comment[]) => {
           if (com) {
             this.comm = com;
           } 
           this.emitComms();
         },
         (error) => {
           console.log(error);
           reject(error);
         }
       );
     });

   }


   emitComms() {
     this.com$.next(this.comm);
     this.com$.complete();
   }


}

