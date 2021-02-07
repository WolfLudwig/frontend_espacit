import { AccountService } from './../_services';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const account = this.accountService.accountValue;
    if (account) {
        // vérifier si l'itinéraire est limité par le rôle
        if (route.data.roles && !route.data.roles.includes(account.role)) {
            // rôle non autorisé donc rediriger vers la page d'accueil
            this.router.navigate(['/']);
            return false;
        }

        // autorisé alors retourne vrai
        return true;
    }

    // non connecté alors redirigez vers la page de connexion avec l'URL de retour
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
