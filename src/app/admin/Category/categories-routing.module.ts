import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditCategoryComponent } from './add-edit-category';
import { ListCategoriesComponent} from './list-categories.component';

const routes: Routes = [
    { path: '', component: ListCategoriesComponent },
    { path: 'add', component: AddEditCategoryComponent },
    { path: 'edit/:id', component: AddEditCategoryComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriesRoutingModule { }