import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsertableComponent } from './components/usertable/usertable.component';
import { CreateUSerComponent } from './create-user/create-user.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { GroupComponent } from './group/group.component';
import { GameComponent } from './game/game.component';
import { RessourceComponent } from './ressource/ressource.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignInComponent } from './signIn/signIn.component';
import {FriendsComponent} from './friends/friends.component';
import { MyFriendsComponent } from './myFriends/myFriends.component';

const routes: Routes = [
  { path: 'incription', component: RessourceComponent, outlet: 'connection' },
  { path: 'actu', component: RessourceComponent },
  { path: 'jeu', component: GameComponent },
  { path: 'groupe', component: GroupComponent },
  { path: 'findFriends', component: ProfileComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'userList', component: UserListComponent },
  { path: 'createUser', component: CreateUSerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sideBar', component: SidebarComponent },
  { path: 'friends', component: FriendsComponent },
  { path: 'myFriends/:id', component: MyFriendsComponent },
  { path: '**', component: SignInComponent },
  {path: 'register', component: RegisterComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
