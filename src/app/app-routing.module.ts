import { GroupComponent } from './group/group.component';
import { GameComponent } from './game/game.component';
import { RessourceComponent } from './ressource/ressource.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilComponent } from './fil/fil.component';

const routes: Routes = [
  { path: 'incription', component: RessourceComponent, outlet: 'connection' },
  { path: 'actu', component: RessourceComponent },
  { path: 'jeu', component: GameComponent },
  { path: 'groupe', component: GroupComponent },
  { path: '**', component: FilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
