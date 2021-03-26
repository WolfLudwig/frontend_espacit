import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css']
})
export class AddRessourceComponent implements OnInit {
ressourceForm : FormGroup;
public ress :  Ressource;
public categories : Category[] = [];
public relations : Relation[] =[];
public ressourceType : RessourceType[] = [];
public user : Users;
public account : Account;
public toStr = JSON.stringify;

public error = false;
public errorMessage : String;


public categorie : String;
public relation : String;
public type : String;

private authSub : Subscription;

public relationsCheck : Relation[] = [];
public typesCheck : RessourceType[] = [];


  constructor(private formBuilder: FormBuilder,
    private ressourceService : RessourceService, 
    private categoriesService : CategoryService,
    private relationService : RelationService,
    private ressourceTypeService : RessourceTypeService,
    private accountService : AccountService,
    private route : Router
    ) {
      this.account = this.accountService.accountValue;

     }

  ngOnInit(): void {

    this.categoriesService.getAllCategories().then(
      (cats : Category[]) => {
        this.categories = cats;
        console.log(this.categories)
      }
    );

    this.relationService.getAllRelations().then(
      (rels : Relation[]) => {
        this.relations = rels;
        console.log(this.relations)
      }
    );

    this.ressourceTypeService.getAllRessourceTypes().then(
      (ress : RessourceType[]) => {
        this.ressourceType = ress;
        console.log(this.ressourceType)
      }
    );
    

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
    if(this.relationsCheck && this.typesCheck && this.ressourceForm.get('category').value
    && this.ressourceForm.get('description').value)
    {
      this.ress = new Ressource();
      const obj = JSON.parse(this.ressourceForm.get('category').value);


      this.ress.relation = this.relationsCheck;

      console.log(this.ress.relation)



      this.ress.ressourceType = this.typesCheck;

      console.log(this.ress.ressourceType)

      console.log(this.ress.ressourceType + " type" );
      this.ress.category = obj
      this.ress.posterPseudo = "";
      this.ress.message = this.ressourceForm.get('postTitle').value;
      if(this.ressourceForm.get('imageUrl').value)
      {
        this.ress.picture = this.ressourceForm.get('imageUrl').value;
      }
      else
      {
        this.ress.picture = "assets/images/post/img-1.jpg"
      }
      console.log("ACCOUNT")
      console.log(this.account)

      this.ress.description= this.ressourceForm.get('description').value;
      this.ressourceService.createNewPost(this.ress, this.account).then(
        (ress : Ressource) =>
        {
          this.route.navigateByUrl("/ressourceDetails/" + ress._id)
        }
      )

      

    }
    else
    {
      this.error = true;
      this.errorMessage = " Veuillez remplir tous les champs"
    }

     

     
      //Le posterId sera à récupérer d'une méthode static pour le fair véhiculer dans toute l'application

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
