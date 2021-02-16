import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from './../_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // ajouter un en-tête d'authentification avec jwt si le compte est connecté et que la demande est adressée à l'URL de l'API
        const account = this.accountService.accountValue;
        const isLoggedIn = account && account.jwtToken;
        const isApiUrl = request.url.startsWith('http://localhost:4000');
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${account.jwtToken}` }
            });
        }

        return next.handle(request);
    }
}
