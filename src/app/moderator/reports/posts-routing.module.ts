import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListReportsComponent} from './list-reports.component';

const routes: Routes = [
    { path: '', component: ListReportsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule { }