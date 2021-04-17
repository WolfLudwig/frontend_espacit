import { SuperAdminModule } from './superadmin/superadmin.module';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { GroupComponent } from './group/group.component';
import { GameComponent } from './game/game.component';
import { RessourceComponent } from './ressource/ressource.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RessourceDetailsComponent } from './ressource-details/ressource-details.component';
import { AddRessourceComponent } from './add-ressource/add-ressource.component';
import { MyFriendsComponent } from './myFriends/myFriends.component';
import { ModifyRessourceComponent } from './modify-ressource/modify-ressource.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const superAdminModule = () => import('./superadmin/superadmin.module').then(x => x.SuperAdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);
const moderatorModule = () => import('./moderator/moderator.module').then(x => x.ModeratorModule);

const routes: Routes = [
  { path: '', component: RessourceComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'superadmin', loadChildren: superAdminModule, canActivate: [AuthGuard], data: { roles: [Role.SuperAdmin] } },
  { path: 'actu', component: RessourceComponent },
  { path: 'jeu', component: GameComponent },
  { path: 'groupe', component: GroupComponent },
  { path: 'ressourceDetails/:id', component: RessourceDetailsComponent},
  { path: 'findFriends', component: FindFriendsComponent},
  { path: 'myFriends', component: MyFriendsComponent},
  { path: 'addRessource', component: AddRessourceComponent},
  { path: 'modifyRessource/:id', component: ModifyRessourceComponent},
  { path: 'reports', loadChildren: moderatorModule},
  { path: '**', component: RessourceComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
