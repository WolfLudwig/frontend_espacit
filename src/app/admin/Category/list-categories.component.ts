import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { AccountService, AlertService, CategoryService } from 'src/app/_services';

@Component({ templateUrl: 'list-categories.component.html' })
export class ListCategoriesComponent implements OnInit {
    public categories: Category[];
    public catSub : Subscription;
    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private categoryService : CategoryService
    ) {
        this.catSub = this.categoryService.cat$.subscribe
        (
            (cat : Category[]) => {
                console.log(cat);
                this.categories = cat;
            }
        )
        this.categoryService.getAllCategories();
    }

    ngOnInit() {
        
    }

    deleteCategory(id : String)
    {
        this.categoryService.deleteCategory(id);
        console.log(id)
    }
}
