import { SuperAdminModule } from './superadmin/superadmin.module';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models';
import { FindFriendsComponent } from './find-friends/find-friends.component';
import { GroupComponent } from './group/group.component';
import { GameComponent } from './game/game.component';
import { RessourceComponent } from './ressource/ressource.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const superAdminModule = () => import('./superadmin/superadmin.module').then(x => x.SuperAdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
  { path: '', component: RessourceComponent },
  { path: 'account', loadChildren: accountModule },
  { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: 'superadmin', loadChildren: superAdminModule, canActivate: [AuthGuard], data: { roles: [Role.SuperAdmin] } },
  { path: 'actu', component: RessourceComponent },
  { path: 'jeu', component: GameComponent },
  { path: 'groupe', component: GroupComponent },
  { path: '**', component: RessourceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
