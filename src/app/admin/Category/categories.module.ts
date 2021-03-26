import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { AddEditCategoryComponent } from './add-edit-category';
import { ListCategoriesComponent } from './list-categories.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CategoriesRoutingModule,
    ],
    declarations: [
        AddEditCategoryComponent,
        ListCategoriesComponent
    ]
})
export class CategoriesModule { }