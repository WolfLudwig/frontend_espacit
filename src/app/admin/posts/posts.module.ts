import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { AddEditPostComponent } from './add-edit-posts';
import { ListPostsComponent } from './list-posts.component';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PostsRoutingModule,
        MatListModule,
        MatDividerModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatTableModule,
    ],
    declarations: [
        AddEditPostComponent,
        ListPostsComponent
    ]
})
export class PostsModule { }