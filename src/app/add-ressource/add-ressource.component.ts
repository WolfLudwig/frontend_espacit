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
public categories : Category[] = [];
public relations : Relation[] =[];
public ressourceType : RessourceType[] = [];
public user : Users;


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
    private authService : AuthService) { }

  ngOnInit(): void {


    this.authSub = this.authService.decodedToken$.subscribe(
      (result :any) =>
      {
        this.user = result
        console.log(result + " token add ressource");
      }
    )
    this.categoriesSub = this.categoriesService.cat$.subscribe(
      (cats) => {
        this.categories = cats;
      }
    );
    this.categoriesService.getAllCategories();

    this.relationsSub = this.relationService.rel$.subscribe(
      (rels) => {
        this.relations = rels;
      }
    );
    this.relationService.getAllRelations();

    this.ressourceTypeSub = this.ressourceTypeService.rsType$.subscribe(
      (ress) => {
        this.ressourceType = ress;
      }
    );
    this.ressourceTypeService.getAllRessourceTypes();
    

    this.ressourceForm = this.formBuilder.group({
      relation : [null, Validators.required],
      postTitle: [null, Validators.required],
      category: [null, Validators.required],
      ressourceType :[null, Validators.required],
    });

  }

  onSubmit()
  {
    const ress = new Ressource();

     this.relationsSub = this.relationService.rel$.subscribe(
      (rels) => {
        this.relations = rels;
      });
      this.relationService.getRelationById(this.ressourceForm.get('relation').value);

      //la page doit permettre d'ajouter plusieurs relations et ressources Types à une ressource
      this.relations.forEach(element => {

        ress.relation = [{_id : element._id, title : element.title, description : element.description}];
        
      });

      this.ressourceTypeSub = this.ressourceTypeService.rsType$.subscribe(
        (ress) => {
          this.ressourceType = ress;
        });

      this.ressourceTypeService.getRessourceTypeById(this.ressourceForm.get('ressourceType').value);

      this.ressourceType.forEach(element => {

        ress.ressourceType = [{_id : element._id, title : element.title, description : element.description}];
        
      });

      this.categoriesSub = this.categoriesService.cat$.subscribe(
        (categ) =>{
          this.categories = categ;
        }
      );
      this.categoriesService.getCategoryById(this.ressourceForm.get('category').value)

      this.categories.forEach(element => {
        ress.category = {_id : element._id, 
                         title : element.title, 
                         description : element.description}
        
      });

      const token = this.tokenStorage.getToken();

      this.user = this.authService.decodeToken(token);


      
      //Le posterId sera à récupérer d'une méthode static pour le fair véhiculer dans toute l'application
      ress.posterId = token;
      ress.posterPseudo = "";
      ress.message = (this.ressourceForm.get('postTitle').value);
      ress.picture = "";
      ress.likers = [null];
      ress.comments = [null];
      console.log(ress);
      this.ressourceService.createNewPost(ress);
  }

}
