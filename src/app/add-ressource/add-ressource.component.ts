import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private tokenStorage: TokenStorageService,
    private userService : UserService,
    private authService : AuthService) { }

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
      
      this.ress.description= this.ressourceForm.get('description').value;
      this.ress.likers = [null];
      this.ress.comments = [null];
      this.ressourceService.createNewPost(this.ress);
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
