import { UsertableComponent } from './components/usertable/usertable.component';
import { CreateUSerComponent } from './create-user/create-user.component';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { GroupComponent } from './group/group.component';
import { GameComponent } from './game/game.component';
import { RessourceComponent } from './ressource/ressource.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'incription', component: RessourceComponent, outlet: 'connection' },
  { path: 'actu', component: RessourceComponent },
  { path: 'jeu', component: GameComponent },
  { path: 'groupe', component: GroupComponent },
  { path: 'findFriends', component: FindFriendsComponent },
  { path: 'createUser', component: CreateUSerComponent},
  { path: 'userList', component: UsertableComponent },
  { path: '**', component: RessourceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
