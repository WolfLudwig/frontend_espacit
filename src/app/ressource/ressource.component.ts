//TODO Voir ce que GetCurrentUser fait

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ressource, Account, Comment, Category, Relation, RessourceType, Answer, Thread } from './../models';
import { RessourceService, AuthService, AccountService, CommentService, CategoryService, RelationService, RessourceTypeService} from '../_services';
import { TokenStorageService } from '../_services/token-storage.service';
//import { UserService } from '../services/users.service';
import { AuthInterceptor } from '../_helpers/auth.interceptor';




@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {
  
  @Input() errorMessage : String;
  public ressources : Ressource[] = [];

  public isLoading = false;


  public ressourcesSub : Subscription;
 /* commentForm : FormGroup;
  answerForm : FormGroup;
  answersForm : FormGroup;
  threadForm : FormGroup; */
  public user: Account;

  public relFilters : String[] = [];
  public catFilters : String[] = [];
  public typeFilter : String[] = [];



  public currentUser : Account;
  public error = false;

  public liked = [];



  public categories : Category[] = [];
  public relations : Relation[] = [];
  public ressourceTypes : RessourceType[] = [];



  constructor(private ressourceService : RessourceService,
  
    private router: Router,
    private route: ActivatedRoute,
   // private formBuilder: FormBuilder,
    private data: RessourceService,
    private tokenStorage: TokenStorageService,
    private accountService: AccountService,
    //private authService : AuthService,
    //private authInterceptor : AuthInterceptor,
    private commentService : CommentService,
    private categoriesService : CategoryService,
    private relationService: RelationService,
    private ressourceTypeService : RessourceTypeService
    ) {
        this.user = this.accountService.accountValue
     }

    ngOnInit()
    {
      this.isLoading = true;
      this.ressourcesSub = new Subscription();
/*
       this.commentForm = this.formBuilder.group({
         userComm: [null],
       });
       this.answerForm = this.formBuilder.group({
         answer : [null]
       });

       this.answersForm = this.formBuilder.group({
        answer : [null]
      });
      this.threadForm = this.formBuilder.group({
        answer : [null]
      });
*/
      this.categoriesService.getAllCategories().then(
        (cat : Category[]) =>
        {
          console.log(cat);
          this.categories = cat;
        }
      )

      this.relationService.getAllRelations().then(
        (rel : Relation[]) =>
        {
          this.relations = rel;
        }
      )

      this.ressourceTypeService.getAllRessourceTypes().then(
        (typeRess : RessourceType[]) =>
        {
          this.ressourceTypes = typeRess;
        }
      )

       this.ressourceService.getAllPosts().then(
        (ress : Ressource[]) =>
        {
            this.ressources = ress;

            this.checkLikes();
            this.isLoading= false;

        });

 
    }
    /*
    like(idRess : String)
    {  
      console.log(" dans le like :" + idRess);

      this.ressourceService.addLike(idRess).then(
        () =>
        {
          this.accountService.getCurrentUser().then(
            (resp : Account) =>
            {
              this.user = resp;
              console.log(this.user)
            }
          );

          this.checkLikes();

        }
      )
      
    }

    unLike(idRess : String)
    {
      console.log(this.ressources + " ressource avant unlike");

      this.ressourceService.unLike(idRess).then(
        () =>
        {
          this.accountService.getCurrentUser().then(
            (resp : Account) =>
            {
              this.user = resp;
              console.log(this.user)
            }
          );

          if(this.user.likes)
          {
            this.checkLikes();
          }
          


        })   

    }*/

    addComment(idRess : string, commId : string, pseudo : string)
    {

      
      console.log(this.user + " comment ");
      // comm : Comment = new Comment({

      // })
  /*    
      const infos = {idress : idRess, 
                    message : this.commentForm.get('userComm').value
                  };
*/
        // this.ressourcesSub = this.ressourceService.post$.subscribe(
        //   (ress) =>
        //   {
        //     //console.log(ress);

        //   });
        //   this.ressourceService.createNewComm(infos)
        //   .then(
        //   () =>
        //   {
        //     this.commentForm.get('userComm').reset();
        //   }
        // )   

/*
          this.ressourceService.createNewComm(infos)
          .then(
          () =>
          {
            this.commentForm.get('userComm').reset();
          }
        )  

*/
      //  this.ressourceService.post$.createNewComm(infos)
      //  .then(
      //    (ress : Ressource[]) =>
      //    {
      //      this.ressources = ress
      //      this.commentForm.get('userComm').reset();
      //    }
      //  )
      

    }
/*
    askComment(commId : String, posterId : String, pseudo : String,  idRess : String)
    {
      console.log(idRess + " identifiant du post");
      console.log(commId + " l'identifiant commentaire")
      console.log(posterId + " a qui je répond");
      console.log(pseudo + " pseudo a qui je répond");
      let message = this.answerForm.get('answer').value;
  
      console.log("message à envoyer : " + message);
      const resp = {idPost : idRess, commId : commId, answId : null, pseudo : pseudo, commenterId :posterId, message :  message }

      this.ressourceService.askComm(resp).then((
        resp =>
        {
          this.answerForm.get('answer').reset();
          console.log(resp);
        }
      ));

      

    }

    askAnswer(answId : String, posterId : String, pseudo : String,  idRess : String)
    {
      console.log(idRess + " identifiant du post");
      console.log(answId + " identifiant reponse");
      console.log(posterId + " a qui je répond");
      console.log(pseudo + " pseudo a qui je répond");
      let message = this.answersForm.get('answer').value;
      const resp = {idPost : idRess, commId : answId, pseudo : pseudo, commenterId :posterId, message :  message }

      this.ressourceService.askAnswer(resp).then((
        resp =>
        {
          this.answersForm.get('answer').reset();
        }
      ));
    }
*/
    askThread( threadId : String, threadPseudo : String, idRess : String)
    {
      console.log(threadId)
      console.log(threadPseudo)
      console.log(idRess)

    }


    checkLikes()
    {
      let find = false;
      this.ressources?.forEach(liker =>
        {
          console.log('Ce message est à but non publicitaire ' , this.user );
          this.user?.likes?.forEach(like =>
            { 
              if(liker._id == like)
              {
                find = true;
              }
            })
            if(find == true)
            {
              this.liked.push(1)
              find = false;
            }
            else
            {
              this.liked.push(0)
            }
        })
    }


    checkTypesFilters(event)
    {
      
      if(event.target.checked == false)
      {
        if( this.typeFilter.includes(event.target.value))
        {
          const id = this.typeFilter.indexOf(event.target.value);
          this.typeFilter.splice(id, 1);

        }
        if(this.typeFilter.includes("0"))
        {
          const id = this.typeFilter.indexOf("0");
          this.typeFilter.splice(id, 1);
        }
      }
      else
      {
        if(this.typeFilter.includes("0"))
        {
          const id = this.typeFilter.indexOf("0");
          this.typeFilter.splice(id, 1);
        }
          this.typeFilter.push(event.target.value);
      }
      console.log(this.typeFilter)
    }


    checkRelFilters(event)
    {
      if(event.target.checked == false)
      {
        if( this.relFilters.includes(event.target.value) )
        {
          const id = this.relFilters.indexOf(event.target.value);
          this.relFilters.splice(id, 1);

        }
        if(this.relFilters.includes("0"))
        {
          const id = this.relFilters.indexOf("0");
          this.relFilters.splice(id, 1);
        }
      }
      else
      {
        if(this.relFilters.includes("0"))
        {
          const id = this.relFilters.indexOf("0");
          this.relFilters.splice(id, 1);
        }
          this.relFilters.push(event.target.value);
      }
      console.log(this.relFilters)
    }

    checkCatFilters(event)
    {
      if(event.target.checked == false)
      {
        if( this.catFilters.includes(event.target.value))
        {
          const id = this.catFilters.indexOf(event.target.value);
          this.catFilters.splice(id, 1);

        }
        if(this.catFilters.includes("0"))
        {
          const id = this.catFilters.indexOf("0");
          this.catFilters.splice(id, 1);
        }
      }
      else
      {
        if(this.catFilters.includes("0"))
        {
          const id = this.catFilters.indexOf("0");
          this.catFilters.splice(id, 1);
        }
        this.catFilters.push(event.target.value);

    }
    console.log(this.catFilters)
  }

  validFilters()
  {
    this.error = false;
    this.isLoading = true;

    if(this.catFilters.length==0)
    {
      this.catFilters.push("0");
    }
    if(this.relFilters.length==0)
    {
      this.relFilters.push("0");
    }
    if(this.typeFilter.length==0)
    {
      this.typeFilter.push("0");
    }
    console.log(this.typeFilter)

    if(this.typeFilter.includes("0") && this.relFilters.includes("0") && this.catFilters.includes("0") )
    {
      this.ressourceService.getAllPosts().then(
        (ress : Ressource[])=>
        {
          this.ressources = ress;
          this.isLoading = false;
        }
      )
    }
    else
    {
      this.ressourcesSub = this.ressourceService.post$.subscribe(
        (ress) =>
        {
          if(ress.length>0)
          {
            this.ressources = ress;
            this.isLoading = false;
          }
          else
          {
            this.isLoading = false;
            this.error = true;
            this.errorMessage ="Pas de ressource à charger pour ce type de filtres"
          }
          
        }
      )
      this.ressourceService.getAllPostsByFilters(this.catFilters, this.relFilters, this.typeFilter)

    }

    
  }


    


    // setAll(completed: boolean) {
    //   if (this.categories == null) {
    //     return;
    //   }
    //   this.categories.forEach(t => t.title = completed);
    // }


}
