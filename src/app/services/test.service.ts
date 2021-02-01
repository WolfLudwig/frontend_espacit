import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, interval, observable, from } from 'rxjs';
import { Test } from '../models/test.model';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class TestService {
constructor(private http: HttpClient) {}

  private test: Test[] = [
    {
        _id :"1234",
        title :"c'est un titre",
        description :"c'est une description"
      
    }
  ];

    
  test$ = new Subject<Test[]>();
  currentTest$ = this.test$.asObservable();

  public observable = from([this.test]);

  



  createNewPost(ress: Test) {
      return this.http.post('http://localhost:3000/api/post', ress).subscribe(
        (ress : Test[]) => {
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

   getAllPosts()
   {

       return this.http.get('http://localhost:3000/api/post').subscribe(
         (ress : Test[]) => {
           if (ress) {
             
             this.test = ress;
             this.emitPosts();
             
           } 
         },
         (error) => {
           //console.log(error);
         }
       );

   }

     emitPosts() {
      
       //this.currentPost$.subscribe(this.post$);
       this.test$.next(this.test);
     }


  addLike(ress : Test)
  {
    console.log("dans le addLike avec id : " + ress);
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:3000/api/post/like', ress).subscribe(
        (response) => {
          this.emitPosts();
          resolve(response);  
        },
        (error) => {
          reject(error);
        }
      );
    });

  }

  createNewComm(infosComm : String[]) {
      return this.http.patch('http://localhost:3000/api/post/comment-post', infosComm).subscribe(
        (ress : Test[]) => {
          this.test = ress;
          this.emitPosts();
          
        },
        (error) => {
          //console.log(error);
        }
      );
  }


}

