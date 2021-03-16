import { AccountService } from '../_services';

export function appInitializer(accountService: AccountService) {
    return () => new Promise(resolve => {
            // tentative d'actualisation du jeton au démarrage de l'application pour s'authentifier automatiquement
            accountService.refreshToken()
            .subscribe()
            .add(resolve);
            console.log(document.cookie);
            console.log("Cookies SESSION DANS INIT");
    });
}
