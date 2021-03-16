import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ressource } from '../models/ressource';
import { RessourceService } from '../_services/ressource.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Users } from '../models/user';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AuthInterceptor } from '../_helpers/auth.interceptor';
import {Comment } from '../models/comment';
import { CommentService } from '../_services/comment.service';
import { Answer } from '../models/answer';
import { Thread } from '../models/thread';
import { CategoryService } from '../_services/category.service';
import { Category } from '../models/category';
import { RelationService } from '../_services/relation.service';
import { Relation } from '../models/relation';
import { RessourceTypeService } from '../_services/ressourceType.service';
import { RessourceType } from '../models/ressourceType';
import { Account } from '../models';
import { AccountService } from '../_services';




@Component({
  selector: 'app-ressource-details',
  templateUrl: './ressource-details.component.html',
  styleUrls: ['./ressource-details.component.css']
})
export class RessourceDetailsComponent implements OnInit {
  
  @Input() errorMessage : String;
  @Output() likes = new EventEmitter<boolean>();
  public ressources : Ressource;
  public count = 0;

  public isLoading = false;
  public isChecked = false;

  public ressourcesSub : Subscription;
  commentForm : FormGroup;
  answerForm : FormGroup;
  answersForm : FormGroup;
  threadForm : FormGroup;
  public account: Account;

  public users : Users[] = [];

  public relFilters : String[] = [];
  public catFilters : String[] = [];
  public typeFilter : String[] = [];



  public currentUser : Users;
  public error = false;

  public liked = [];

  public infos = false;
  public infoMessage : String;



  public categories : Category[] = [];
  public relations : Relation[] = [];
  public ressourceTypes : RessourceType[] = [];



  constructor(private ressourceService : RessourceService,
  
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private categoriesService : CategoryService,
    private relationService: RelationService,
    private ressourceTypeService : RessourceTypeService,
    private route : ActivatedRoute,
    private tokenStorage : TokenStorageService,
    private accountService : AccountService
    ) {
      this.account = this.accountService.accountValue;
      
      this.ressources = new Ressource();
     }

    ngOnInit()
    {

      this.route.params.subscribe(
        (params: Params) => {
          this.ressourceService.getPostById(params.id).then(
            (resp : Ressource) =>
              {
                this.ressources = resp;
                console.log(this.ressources)
              }
          )
        });
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


 
    }




    addComment(idRess : String)
    {    
      const infos = {idress : idRess, 
                    message : this.commentForm.get('userComm').value,
                    posterId : this.account.id,
                    pseudo : this.account.pseudo
                  };

          this.ressourceService.createNewComm(infos)
          .then(
          (resp : Ressource) =>
          {
            this.ressources.comments = resp.comments;
            this.commentForm.get('userComm').reset();
          }
        )  
    }

    askComment(commId : String, posterId : String, pseudo : String,  idRess : String)
    {

      let message = this.answerForm.get('answer').value;
      const resp = {idPost : idRess, commId : commId, answId : null, pseudo : pseudo, commenterId :posterId, message :  message, posterId : this.account.id, pseudos :  this.account.pseudo}

      this.ressourceService.askComm(resp).then(
        (resp : Ressource) =>
        {
          this.ressources.answers = resp.answers;
          this.answerForm.get('answer').reset();
        }
      );
    }

    askAnswer(answId : String, posterId : String, pseudo : String,  idRess : String)
    {
      let message = this.answersForm.get('answer').value;
      const resp = {idPost : idRess, commId : answId, pseudo : pseudo, commenterId :posterId, message :  message, posterId : this.account.id, pseudos : this.account.pseudo }

      this.ressourceService.askAnswer(resp).then(
        (resp : Ressource) =>
        {
          this.ressources.thread = resp.thread
          this.answersForm.get('answer').reset();
        }
      );
    }

    
  }
