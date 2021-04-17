import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditPostComponent } from './add-edit-posts';
import { ListPostsComponent} from './list-posts.component';

const routes: Routes = [
    { path: '', component: ListPostsComponent },
    { path: 'add', component: AddEditPostComponent },
    { path: 'edit/:id', component: AddEditPostComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule { }