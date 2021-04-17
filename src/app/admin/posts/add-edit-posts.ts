import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, CategoryService, RelationService, 
    RessourceService, RessourceTypeService } from '../../_services';
import { Account, Category, Relation, Ressource, RessourceType } from 'src/app/models';

@Component({ templateUrl: 'add-edit-posts.html' })
export class AddEditPostComponent implements OnInit {
    form: FormGroup;
    id: string;
    idPost : string;
    isAddMode: boolean;
    public category : Category;
    loading = false;
    submitted = false;
    public toStr = JSON.stringify;

    public relationsCheck : Relation[] = [];
    public typesCheck : RessourceType[] = [];   

    public ress :  Ressource;
    public categories : Category[] = [];
    public relations : Relation[] =[];
    public ressourceType : RessourceType[] = [];

    public categorie : String;
    public relation : String;
    public type : String;

    public account : Account;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private categoryService : CategoryService,
        private relationService : RelationService,
        private ressourceTypeService : RessourceTypeService,
        private ressourceService : RessourceService
    ) {
        this.id = this.accountService.accountValue.id;
        this.account = this.accountService.accountValue;
        

    }

    ngOnInit() {

        this.idPost = this.route.snapshot.params['id'];
        this.isAddMode = !this.idPost;
        console.log(" DANS L'INIT EDIT CAT");
        console.log(this.isAddMode)
        console.log(this.idPost)

        this.categoryService.getAllCategories().then(
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

        if(this.isAddMode)
        {
            this.form = this.formBuilder.group({
                relation : [null],
                postTitle: [null],
                category: [null],
                ressourceType :[null],
                imageUrl : [null],
                description : [null],
                isSuspend : [null]
              });
    
        }
        else
        {
            console.log("dans edit")
            if(this.idPost)
            {
                this.form = this.formBuilder.group({
                    relation : [null, Validators.required],
                    postTitle: [null, Validators.required],
                    category: [null, Validators.required],
                    ressourceType :[null, Validators.required],
                    imageUrl : [null],
                    description : [null],
                    isSuspend : [null]

                });
                this.ressourceService.getPostById(this.idPost)
                .then(
                    (ress : Ressource) =>
                    {
                      let suspend = ress.isSuspend;

                        this.ress = ress;
                        console.log(this.ress)
                        this.form = this.formBuilder.group({
                            relation : [null],
                            postTitle: [this.ress.message, Validators.required],
                            category: [this.ress.category],
                            ressourceType :[this.ress.ressourceType],
                            imageUrl : [this.ress.picture],
                            description : [this.ress.description, Validators.required],
                            isSuspend : [suspend]
                        });
                    }
                )
                
            }

            
        }

        if (!this.isAddMode) {
            this.accountService.getOneUser(this.id)
                .pipe(first())
        }
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

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
      console.log(this.form.value);
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
          console.log("DANS FORM INVALID")
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.addPost();
        } else {
            this.updatePost();
        }
    }


    private addPost() {
      console.log("DANS LAJOUT !!!!")
      this.ress = new Ressource();
      const obj = JSON.parse(this.form.get('category').value);

      console.log(this.relationsCheck);
      this.ress.relation = this.relationsCheck;
      console.log(this.ress.relation)




      this.ress.ressourceType = this.typesCheck;

      console.log(this.ress.ressourceType)

      console.log(this.ress.ressourceType + " type" );
      this.ress.category = obj
      this.ress.posterPseudo = "";
      this.ress.message = this.form.get('postTitle').value;
      if(this.form.get('imageUrl').value)
      {
        this.ress.picture = this.form.get('imageUrl').value;
      }
      else
      {
        this.ress.picture = "assets/images/post/img-1.jpg"
      }
      console.log("ACCOUNT")
      console.log(this.account)
      this.ress.isSuspend = this.form.get('isSuspend').value;

      this.ress.description= this.form.get('description').value;
      this.ressourceService.createNewPost(this.ress, this.account).then(
        (ress : Ressource) =>
        {
          this.router.navigateByUrl("/ressourceDetails/" + ress._id)
        }
      )

    }

    private updatePost() {
      let ress = new Ressource();
      ress = this.ress;

      console.log(ress);
      const obj = JSON.parse(this.form.get('category').value);

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
        
      if(this.form.get('postTitle').value)
      {
        ress.message = (this.form.get('postTitle').value);
      }
      if(this.form.get('imageUrl').value)
      {
        ress.picture = this.form.get('imageUrl').value
      }
      if(this.form.get('description').value)
      {
        ress.description = this.form.get('description').value
      }
      if(this.form.get('isSuspend').value == "Oui")
      {
        ress.isSuspend = true;
      }
      else
      {
        ress.isSuspend = false;
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
