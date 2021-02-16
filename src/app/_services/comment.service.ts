import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Comment, Account } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
constructor(private http: HttpClient) {}

  private comm: Comment[] = [
    {
        commenterId : "5ff2f561f3831a54b42fce83",
        commenterPseudo : "laCrème", 
        text :'un commentaire ! ', 
                
    }
  ];

  private user: Account[] = [];
    
  
  public com$ = new Subject<Comment[]>();
  currentCom$ = this.com$.asObservable();
  



  createNewComm(infosComm : any) {
    console.log(infosComm);
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:3000/api/post/comment-post/', infosComm).subscribe(
        (response : Comment[]) => {
          this.comm = response;
          this.emitComms();
          resolve(response);
          
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  

   getAllCommentsById(id : String)
   {
     return new Promise((resolve, reject) => {
       this.http.get('http://localhost:3000/api/comment/all/' + id).subscribe(
         (com : Comment) => {
           if (com) {
             
             console.log(com);
             resolve(com);
           } 
           
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
   }

   getAllComments()
   {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/api/comment').subscribe(
        (com : Comment[]) => {
          if (com) {
            console.log(com);
            this.comm = com;
            resolve(com);
            this.emitComms();
          } 
          
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

   }


}