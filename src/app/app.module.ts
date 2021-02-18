import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RessourceComponent } from './ressource/ressource.component';
import { GameComponent } from './game/game.component';
import { GroupComponent } from './group/group.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule,  } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignInComponent } from './signIn/signIn.component';
import { HomeComponent } from './home/home.component';
import { FriendsComponent } from './friends/friends.component';
import { MyFriendsComponent } from './myFriends/myFriends.component';
import { AddRessourceComponent } from './add-ressource/add-ressource.component';


import { ToolbarComponent } from './toolbar/toolbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
// Import matérial
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { CreateUSerComponent } from './create-user/create-user.component';
import { UsertableComponent } from './components/usertable/usertable.component';

import { AuthInterceptor, authInterceptorProviders } from './_helpers/auth.interceptor';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { CommentComponent } from './comment/comment.component';
import { ModifyRessourceComponent } from './modify-ressource/modify-ressource.component';
import { RessourceDetailsComponent } from './ressource-details/ressource-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    RessourceComponent,
    GameComponent,
    GroupComponent,
    RegisterComponent,
    ChatComponent,
    ToolbarComponent,
    FindFriendsComponent,
    CreateUSerComponent,
    UsertableComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    UserListComponent,
    SignInComponent,
    HomeComponent,
    FriendsComponent,
    MyFriendsComponent,
    AddRessourceComponent,
    CommentComponent,
    ModifyRessourceComponent,
    RessourceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    // Matérial
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
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  providers: [authInterceptorProviders, HttpClientModule, AuthInterceptor],
    
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
