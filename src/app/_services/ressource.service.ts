import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject, interval, observable, from } from 'rxjs';
import { Ressource } from '../models';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/table';
import { map, switchMap, tap  } from 'rxjs/operators';
import { Account } from '../models/account';



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
      description : "",
      likers: [{ _id: "5ff2f561f3831a54b42fce83",
          pseudo: "la crème",
          email: "lacreme@gmail.com"}],
      comments: [
        {
        commenterId : "1234",
        commenterPseudo : "1234",
         text :"un comm"},
        ],
        answers : {
          commId: "1234",
          answId :"1234",
          commenterIdent :"identifiant ce celui qui a mit le comm",
          commPseudo: "pseudoCommenter",
          answerId: "idReponse",
          answerPseudo: "pseudo du repondeux",
          answertext: "reponse",
        },
        thread :
        {
          threadPostId: "String",
          threadAsnwId: "String",
          threadPseudo: "String",
          threadMyId: "String",
          threadMyPseudo: "String",
          threadText: "String",

        },
      relation : [{_id :"1234", title :"1 relation", description :"une description de rel "}],       
      category : {_id : "1234", title :"1 catégorie", description :"une description de cat"},
      ressourceType : [{_id :"1234", title :"1 type de ressource", description :"une description de ress "}]
    
  }
];



  private user: Account[] = [];


    
  post$ = new Subject<Ressource[]>();
  comm$ = new Subject<Comment[]>();
  

   getPostById(id: string) {
     return new Promise((resolve, reject) => {
       this.http.get('http://localhost:4000/api/post/' + id).subscribe(
         (response) => {
           resolve(response);
         },
         (error) => {
           reject(error);
         }
       );
     });
   }

   updatePost(ress : Ressource)
  {
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:4000/api/post/update', ress).subscribe(
        (ress : Ressource[]) => {
          if (ress) {
            console.log(ress)
            this.ress = ress
            this.emitPosts();
            resolve(ress)
            
          } 
        },
        (error) => {
          console.log(error);
        }
      );
    })

  }

   delepost(id : String)
   {
     return new Promise((resolve, reject) => {
       this.http.delete('http://localhost:4000/api/post/'+ id).subscribe(
         (response : Ressource) => {
           if(response)
           {
             var id;
             var count = 0
 
             this.ress.forEach(element =>
               {
                 
                 
                 if(element._id == response._id)
                 {
   
                   id = count
                 }
                 count ++
               })
           }
 
           this.ress.splice(id, 1);
 
           resolve(response)
           this.emitPosts();
 
         },
         (error) => {
           reject(error);
         }
       );
     });
 
   }

  createNewPost(ress: Ressource, account : Account) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:4000/api/post', {ress, account}).subscribe(
        (ress : Ressource) => {
          if (ress) {
            console.log(ress)
            this.ress.push(ress)
            
            this.emitPosts();
            resolve(ress);
            
          } 
        },
        (error) => {
          console.log(error);
        }
      );

    })
      
  }

  getAllPostsByFilters(cat : any[], rel : any[], type : any[]) {
    console.log("dans le getAllPostByFilters");
     return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4000/api/post/filters/' + cat + '/'+ rel +'/'+ type).subscribe(
        (ress: Ressource[]) => {
          if(ress)
          {
            console.log(ress);
            this.ress = ress;
            resolve(ress);
            this.emitPosts();

          }

        },
        (error) => {
          reject(error);
        }
      );
    });

  }

  getAllPostsByCats(idFilter : String){

    console.log("dans le getAllPostByFilters");
    return new Promise((resolve, reject) => {
     this.http.get('http://localhost:4000/api/post/filterCat/' + idFilter).subscribe(
       (ress: Ressource[]) => {
         if (ress) {
           console.log(ress);
           this.ress = ress;
            resolve(ress);
           //this.emitPosts();

         }
       },
       (error) => {
         reject(error);
       }
     );
   });
  }

  getAllPosts() {
    console.log("dans le getAllPost");
     return new Promise((resolve, reject) => {
      this.http.get('http://localhost:4000/api/post').subscribe(
        (ress: Ressource[]) => {
          if (ress) {
            this.ress = ress;
             resolve(ress);
            this.emitPosts();

          }
        },
        (error) => {
          reject(error);
        }
      );
    });

  }




     emitPosts() 
     {
       this.post$.next(this.ress);
     }


  addLike(idRess : String, idUser : String )
  {
    
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:4000/api/post/like', {idRess, idUser}).subscribe(
        (res: Ressource) => {
          console.log(res);
          this.ress.forEach(element =>
            {  
              if(element._id == res._id)
              {
                element.likers = res.likers;
                console.log(element.likers + " ressources");
                console.log(res.likers + "reponse");
              }
            })
            
            this.emitPosts();
            resolve(res);
        },
        (error) => {
          console.log(error);
          reject(error);
        }
      );
    });

  }

  unLike(idRess : String, idUser : String )
  {
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:4000/api/post/unlike-post', {idRess, idUser}).subscribe(
        (response: Ressource) => {
          console.log(response + " ressource après unlike");
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
      this.http.patch('http://localhost:4000/api/post/comment-post', infosComm).subscribe(
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

  askComm(infosComm: any) {
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:4000/api/post/answer-post', infosComm).subscribe(
        (response : Ressource) => {
          console.log(response);
          this.ress.forEach(element =>
            {
              
              
              if(element._id == response._id)
              {

                element.answers =  response.answers;
              }
            })
            this.emitPosts();
          
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  askAnswer(infosComm: any) {
    return new Promise((resolve, reject) => {
      this.http.patch('http://localhost:4000/api/post/askAnswer', infosComm).subscribe(
        (response : Ressource) => {
          console.log(response);
          this.ress.forEach(element =>
            {
              
              if(element._id == response._id)
              {

                element.thread =  response.thread;
              }
            })
            this.emitPosts();
          
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
      this.http.get('http://localhost:4000/api/post/liked-post/'+ id).subscribe(
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