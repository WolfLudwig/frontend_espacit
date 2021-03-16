import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { from, Subscription } from 'rxjs';
import { Ressource } from '../models/ressource';
import { RessourceService } from '../_services/ressource.service';
import { Comment } from '../models/comment';
import { CategoryService } from '../_services/category.service';
import { Category } from '../models/category';
import { Relation } from '../models/relation';
import { RessourceType } from '../models/ressourceType';
import { RelationService } from '../_services/relation.service';
import { RessourceTypeService } from '../_services/ressourceType.service';
import { UserService } from '../_services/user.service';
import { Users } from '../models/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { AccountService } from '../_services';
import { Account } from '../models';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {

  @Input() errorMessage : String;
  @Output() likes = new EventEmitter<boolean>();

  public ressources: Ressource[] = [];
  public comme: Comment[] = [];

  public isLoading = false;
  public isChecked = false;
  public error = false;
  public liked = [];
  public user: Users;
  public account : Account;

  public relFilters : String[] = [];
  public catFilters : String[] = [];
  public typeFilter : String[] = [];

  public myObservable = from(this.ressources);
  public ress: Ressource = new Ressource();
  public comm: Comment;
  private ressourcesSub: Subscription;
  private commsSub: Subscription;
  commentForm: FormGroup;
  public categories : Category[] = [];
  public relations : Relation[] = [];
  public ressourceTypes : RessourceType[] = [];

  constructor(private ressourceService: RessourceService, 
    private formBuilder: FormBuilder,
    private categoriesService : CategoryService,
    private relationService : RelationService,
    private ressourceTypeService : RessourceTypeService,
    private userService : UserService,
    private tokenStorage : TokenStorageService,
    private router: Router,
    private accountService : AccountService) 
    {
      this.account = this.accountService.accountValue;
     }
     

  ngOnInit(): void {

    this.commentForm = this.formBuilder.group({
      userComm: [null],
    });

    this.ressourceService.getAllPosts().then(
      (ress : Ressource[]) =>
      {
        this.ressources = ress;
        this.account = this.accountService.accountValue;
        this.accountService.getCurrentUser(this.account.id).then(
          (account : Account) =>
          {
            console.log(account)
            this.account = account
          }
        )
        console.log(this.account);

        this.checkLikes();
        
      }
    );

    this.categoriesService.getAllCategories().then(
      (cat : Category[]) =>
      {
        this.categories = cat;
        console.log(this.categories)
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

  like(idRess : String)
  {  
    this.account = this.accountService.accountValue;
    console.log(this.account.id);
    this.ressourceService.addLike(idRess, this.account.id).then(
      () =>
      {
        this.accountService.getCurrentUser(this.account.id).then(
          (account : Account) =>
          {
            console.log(account)
            this.account = account
            this.checkLikes();
          }
        )

      }
    )
    
  }

  unLike(idRess : String)
    {
      this.account = this.accountService.accountValue;
      console.log(this.account.id);
      this.ressourceService.unLike(idRess, this.account.id).then(
        () =>
        {
          this.accountService.getCurrentUser(this.account.id).then(
            (account : Account) =>
            {
              console.log(account)
              this.account = account
              this.checkLikes();
            }
          )
  
        }
      )

    }

  ressourceDetails(id : String)
  {
    console.log(id + " idressource");
    this.router.navigateByUrl('/ressourceDetails/' + id)
  }

  addComment(idRess: string, idPoster: string, pseudo: string): void {


    const infos = [];
    infos.push({ idress: idRess, posterId: idPoster, posterName: pseudo, message: this.commentForm.get('userComm').value });

    this.ressourceService.createNewComm(infos);
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

  checkLikes()
  {
    let find = false;
    this.liked = []
    console.log("AVANT DE VERIFIER LES LIKES");
    console.log(this.account.likes);

    this.ressources.forEach(liker =>
      {
        if(this.account.likes)
        {
          this.account.likes.forEach(like =>
            { 
              if(liker._id == like)
              {
                console.log("trouvé");
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
}
