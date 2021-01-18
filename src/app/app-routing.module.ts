import { GroupComponent } from './group/group.component';
import { GameComponent } from './game/game.component';
import { RessourceComponent } from './ressource/ressource.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainContentComponent } from './main-content/main-content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SignInComponent } from './signIn/signIn.component';
import {FriendsComponent} from './friends/friends.component';
import { MyFriendsComponent } from './myFriends/myFriends.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'incription', component: RessourceComponent, outlet: 'connection' },
  { path: 'actu', component: RessourceComponent },
  { path: 'jeu', component: GameComponent },
  { path: 'groupe', component: GroupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'mainContent', component: MainContentComponent },
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
