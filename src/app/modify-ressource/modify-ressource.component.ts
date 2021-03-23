import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category';
import { Relation } from '../models/relation';
import { Ressource } from '../models/ressource';
import { RessourceType } from '../models/ressourceType';
import { Users } from '../models/user';
import { CategoryService } from '../_services/category.service';
import { RelationService } from '../_services/relation.service';
import { RessourceService } from '../_services/ressource.service';
import { RessourceTypeService } from '../_services/ressourceType.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Account } from '../models';
import { AccountService } from '../_services';

@Component({
  selector: 'app-modify-ressource',
  templateUrl: './modify-ressource.component.html',
  styleUrls: ['./modify-ressource.component.css']
})
export class ModifyRessourceComponent implements OnInit {
ressourceForm : FormGroup;
public categories : Category[] = [];
public relations : Relation[] =[];
public ressourceType : RessourceType[] = [];
public user : Users;
public account : Account;
public error = false;
public errorMessage : String;

public ressource : Ressource;

public relationsCheck : Relation[] = [];
public typesCheck : RessourceType[] = [];

public categorie : String;
public relation : String;
public type : String;

public toStr = JSON.stringify;


private categoriesSub: Subscription;
private relationsSub : Subscription;
private ressourceTypeSub : Subscription;


  constructor(private formBuilder: FormBuilder,
    private ressourceService : RessourceService, 
    private categoriesService : CategoryService,
    private relationService : RelationService,
    private ressourceTypeService : RessourceTypeService,
    private tokenStorage: TokenStorageService,
    private userService : UserService,
    private accountService : AccountService,
    private route  : ActivatedRoute,
    private router : Router
    ) { 
      this.account = accountService.accountValue;
      
      this.route.params.subscribe(
        (params: Params) => {
  
          this.ressourceService.getPostById(params.id).then(
            (ress : Ressource)=>
            {
              this.ressource = ress;
              console.log(this.ressource);
            }
          )
        })
    }

  ngOnInit(): void {


    this.categoriesService.getAllCategories().then(
      (cats : Category[]) => {
        this.categories = cats;
        
      }
    );

    this.ressourceTypeService.getAllRessourceTypes().then(
      (ress : RessourceType[]) => {
        this.ressourceType = ress;
      }
    );

    this.relationService.getAllRelations().then(
      (rela : Relation[]) =>
      {
        this.relations = rela;
      }
    )
    

    this.ressourceForm = this.formBuilder.group({
      relation : [null, Validators.required],
      postTitle: [null, Validators.required],
      category: [null, Validators.required],
      ressourceType :[null, Validators.required],
      imageUrl : [null],
      description : [null]
    });

  }

  checkRelations(event)
  {

    const obj = JSON.parse(event.target.value);

    if(event.target.checked == false)
    {
        let id;      
        let count = 0;
        this.relationsCheck.forEach(elem =>
          {
            if(elem._id == obj._id)
            {
              id = count;
            }
            count++
          })
          this.relationsCheck.splice(id, 1);
    }
    else
    {
      this.relationsCheck.push(obj);
    }
    console.log(this.relationsCheck);
}

checkTypes(event)
{
  const obj = JSON.parse(event.target.value);

  if(event.target.checked == false)
  { 
      let id;      
      let count = 0;
      this.typesCheck.forEach(elem =>
        {
          if(elem._id == obj._id)
          {
            id = count;
          }
          count++
        })
        this.typesCheck.splice(id, 1);
  }
  else
  {
    this.typesCheck.push(obj);
  }
  console.log(this.typesCheck);
}

   onSubmit()
   {

      let ress = new Ressource();
      ress = this.ressource;

      console.log(ress);
      const obj = JSON.parse(this.ressourceForm.get('category').value);

      if(this.relationsCheck)
      {
        ress.relation = this.relationsCheck;
      }
      if(this.typesCheck)
      {
        ress.ressourceType = this.typesCheck;
      }
      if(obj)
      {
        ress.category = obj
      }
        
      if(this.ressourceForm.get('postTitle').value)
      {
        ress.message = (this.ressourceForm.get('postTitle').value);
      }
      if(this.ressourceForm.get('imageUrl').value)
      {
        ress.picture = this.ressourceForm.get('imageUrl').value
      }
      if(this.ressourceForm.get('description').value)
      {
        ress.description = this.ressourceForm.get('description').value
      }

      this.ressourceService.updatePost(ress)
      .then(
         ()=>
         {
           this.router.navigateByUrl('/ressourceDetails/' + ress._id);
         }
       )
   }

  getValueCat(event)
  {
    console.log(event.target.value)
    this.categorie = event.target.value
  }

  getValueRel(event)
  {
    console.log(event.target.value)
    this.relation= event.target.value
  }

  getValueType(event)
  {
    console.log(event.target.value)
    this.type = event.target.value
  }

}
