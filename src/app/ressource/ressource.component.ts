import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ressource } from '../models/ressource.model';
import { RessourceService } from '../services/ressources.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';
import { AuthService } from '../_services/auth.service';
import { AuthInterceptor } from '../_helpers/auth.interceptor';
import {Comment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';
import { Answer } from '../models/answer.model';
import { Thread } from '../models/thread.model';
import { CategoryService } from '../services/categories.service';
import { Category } from '../models/category.model';
import { RelationService } from '../services/relations.service';
import { Relation } from '../models/relation.model';
import { RessourceTypeService } from '../services/ressourceType.service';
import { RessourceType } from '../models/ressourceType.model';



@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {
  
  @Input() errorMessage : String;
  @Output() likes = new EventEmitter<boolean>();
  public ressources : Ressource[] = [];
  public count = 0;

  public isLoading = false;
  public isChecked = false;

  public ressourcesSub : Subscription;
  commentForm : FormGroup;
  answerForm : FormGroup;
  answersForm : FormGroup;
  threadForm : FormGroup;
  public user: Users;

  public users : Users[] = [];

  public relFilters : String[] = [];
  public catFilters : String[] = [];
  public typeFilter : String[] = [];



  public currentUser : Users;
  public error = false;

  public liked = [];



  public categories : Category[] = [];
  public relations : Relation[] = [];
  public ressourceTypes : RessourceType[] = [];



  constructor(private ressourceService : RessourceService,
  
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private categoriesService : CategoryService,
    private relationService: RelationService,
    private ressourceTypeService : RessourceTypeService
    ) {
      
      this.userService.getCurrentUser().then(
        (resp : Users) =>
        {
          this.user = resp;
        }
      );
     }

    ngOnInit()
    {
      this.isLoading = true;
      this.ressourcesSub = new Subscription();

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

      this.categoriesService.getAllCategories().then(
        (cat : Category[]) =>
        {
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

            if(this.user)
            {
              if(this.user.likes)
              {
                this.checkLikes();
              }
              
            }
            this.isLoading= false;

        });

 
    }

    ressourceDetails(id : String)
    {
      this.router.navigateByUrl('/ressourceDetails/' + id)
    }

    like(idRess : String)
    {  
      this.ressourceService.addLike(idRess).then(
        () =>
        {
          this.userService.getCurrentUser().then(
            (resp : Users) =>
            {
              this.user = resp;
              this.checkLikes();
            }
          );
        }
      )
      
    }

    unLike(idRess : String)
    {
      this.ressourceService.unLike(idRess).then(
        () =>
        {
          this.userService.getCurrentUser().then(
            (resp : Users) =>
            {
              this.user = resp;
              this.checkLikes();
            }
          );     
        })   

    }


    addComment(idRess : string, commId : string, pseudo : string)
    {    
      const infos = {idress : idRess, 
                    message : this.commentForm.get('userComm').value
                  };

          this.ressourceService.createNewComm(infos)
          .then(
          () =>
          {
            this.commentForm.get('userComm').reset();
          }
        )  
    }

    askComment(commId : String, posterId : String, pseudo : String,  idRess : String)
    {

      let message = this.answerForm.get('answer').value;
      const resp = {idPost : idRess, commId : commId, answId : null, pseudo : pseudo, commenterId :posterId, message :  message }

      this.ressourceService.askComm(resp).then((
        resp =>
        {
          this.answerForm.get('answer').reset();
        }
      ));
    }

    askAnswer(answId : String, posterId : String, pseudo : String,  idRess : String)
    {
      let message = this.answersForm.get('answer').value;
      const resp = {idPost : idRess, commId : answId, pseudo : pseudo, commenterId :posterId, message :  message }

      this.ressourceService.askAnswer(resp).then((
        resp =>
        {
          this.answersForm.get('answer').reset();
        }
      ));
    }


    checkLikes()
    {
      let find = false;
      this.liked = []

      this.ressources.forEach(liker =>
        {
          if(this.user.likes)
          {
            this.user.likes.forEach(like =>
              { 
                if(liker._id == like)
                {
                  find = true;
                }
              })
          }
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

  modifyRessource(ressource : Ressource)
  {
    this.router.navigateByUrl('/modifyRessource/' + ressource);
  }

  deletePost(id : String)
  {
    this.ressourceService.delepost(id).then(
      () => {
        console.log(this.ressources)
      }
    )
  }


}
