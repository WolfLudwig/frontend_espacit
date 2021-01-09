import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainContentInnerComponent } from './main-content-inner/main-content-inner.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { RessourceComponent } from './ressource/ressource.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainContentComponent,
    MainContentInnerComponent,
    ChatSidebarComponent,
    RessourceComponent,
    PostComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
