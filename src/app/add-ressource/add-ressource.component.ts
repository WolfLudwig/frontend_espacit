import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../models/category.model';
import { Relation } from '../models/relation.model';
import { Ressource } from '../models/ressource.model';
import { CategoryService } from '../services/categories.service';
import { RelationService } from '../services/relations.service';
import { RessourceService } from '../services/ressources.service';

@Component({
  selector: 'app-add-ressource',
  templateUrl: './add-ressource.component.html',
  styleUrls: ['./add-ressource.component.css']
})
export class AddRessourceComponent implements OnInit {
ressourceForm : FormGroup;
public categories : Category[] = [];
public relations : Relation[] =[];


private categoriesSub: Subscription;
private relationsSub : Subscription;


  constructor(private formBuilder: FormBuilder,
    private ressourceService : RessourceService, 
    private categoriesService : CategoryService,
    private relationService : RelationService,) { }

  ngOnInit(): void {
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

    this.ressourceForm = this.formBuilder.group({
      postTitle: [null, Validators.required],
      category: [null, Validators.required],
      relation: [null, Validators.required],
      confMdp: [null, Validators.required]
    });
  }

  onSubmit()
  {
    const ress = new Ressource();
    //console.log(this.ressourceForm.get('category'));
    //console.log(this.ressourceForm.get('relation').valueChanges);
    ress.posterId = "5ff2f561f3831a54b42fce83";
    ress.message = "this.ressourceForm.get('message').value;";
    ress.picture = "";
    ress.likers = [null];
    ress.comments = ["1er commentaire"];
    ress.relation = [{ _id : "1234", title : "soi", description : "culture"}];
    ress.category = this.ressourceForm.get('category').value;
    console.log(ress);
    //this.ressourceService.createNewPost(ress);
  }

}
