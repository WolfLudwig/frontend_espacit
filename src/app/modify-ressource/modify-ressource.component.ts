import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { Relation } from '../models/relation.model';
import { Ressource } from '../models/ressource.model';
import { RessourceType } from '../models/ressourceType.model';
import { Users } from '../models/user.model';
import { CategoryService } from '../services/categories.service';
import { RelationService } from '../services/relations.service';
import { RessourceService } from '../services/ressources.service';
import { RessourceTypeService } from '../services/ressourceType.service';
import { UserService } from '../services/users.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

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
private authSub : Subscription;


  constructor(private formBuilder: FormBuilder,
    private ressourceService : RessourceService, 
    private categoriesService : CategoryService,
    private relationService : RelationService,
    private ressourceTypeService : RessourceTypeService,
    private tokenStorage: TokenStorageService,
    private userService : UserService,
    private authService : AuthService,
    private route  : ActivatedRoute,
    private router : Router
    ) { 
      this.route.params.subscribe(
        (params: Params) => {
  
          this.ressourceService.getPostById(params.ressource).then(
            (ress : Ressource)=>
            {
              this.ressource = ress;
              console.log(ress);
            }
          )
        })
    }

  ngOnInit(): void {


    this.authSub = this.authService.decodedToken$.subscribe(
      (result :any) =>
      {
        this.user = result
        console.log(result + " token add ressource");
      }
    )
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

     if(this.relationsCheck && this.typesCheck && this.ressourceForm.get('category').value)
     {
      const ress = new Ressource();
      const obj = JSON.parse(this.ressourceForm.get('category').value);


      ress.relation = this.relationsCheck;

      console.log(ress.relation)

      ress.ressourceType = this.typesCheck;

      console.log(ress.ressourceType)

      console.log(ress.ressourceType + " type" );
      ress.category = obj
        
      ress._id = this.ressource._id;
      ress.posterPseudo = this.ressource.posterPseudo;
      ress.message = (this.ressourceForm.get('postTitle').value);
      ress.picture = this.ressource.picture;
      ress.likers = this.ressource.likers;
      ress.comments = this.ressource.comments;
      console.log(ress);
      this.ressourceService.updatePost(ress).then(
         ()=>
         {
           this.router.navigateByUrl('/actu');
         }
       )
    
    }
     else
     {
       this.error = true;
       this.errorMessage = " veuillez remplir tous les champs"

     }
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
