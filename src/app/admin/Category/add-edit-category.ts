import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, CategoryService } from '../../_services';
import { Category } from 'src/app/models';

@Component({ templateUrl: 'add-edit-category.html' })
export class AddEditCategoryComponent implements OnInit {
    form: FormGroup;
    id: string;
    idCat : string;
    isAddMode: boolean;
    public category : Category;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private categoryService : CategoryService
    ) {
        this.id = this.accountService.accountValue.id;
        

    }

    ngOnInit() {

        this.idCat = this.route.snapshot.params['id'];
        this.isAddMode = !this.idCat;
        console.log(" DANS L'INIT EDIT CAT");
        console.log(this.isAddMode)
        console.log(this.idCat)

        if(this.isAddMode)
        {
            this.form = this.formBuilder.group({
                title: ['', Validators.required],
                description: ['', Validators.required],
            });
    
        }
        else
        {
            console.log("dans edit")
            if(this.idCat)
            {
                this.form = this.formBuilder.group({
                    title: ['', Validators.required],
                    description: ['', Validators.required],
                });
                this.categoryService.getCategoryById(this.idCat)
                .then(
                    (cat : Category) =>
                    {
                        this.category = cat;
                        console.log(this.category)
                        this.form = this.formBuilder.group({
                            title: [this.category.title, Validators.required],
                            description: [this.category.description, Validators.required],
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

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.addCategory();
        } else {
            this.updateCategory();
        }
    }

    private addCategory() {
        this.categoryService.createCategory(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Account created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateCategory() {
        this.category = {
            _id : this.idCat,
            title : this.form.get('title').value,
            description : this.form.get('description').value

        }
        this.categoryService.updateCategory(this.category)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    
}
