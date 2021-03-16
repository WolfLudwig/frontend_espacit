//TODO Créer un 

import { Account } from './../models';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';



const baseUrl = 'http://localhost:4000/accounts';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account>;
    public account: Observable<Account>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account>(null);
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account {
        return this.accountSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
            .pipe(map(account => {
                this.accountSubject.next(account);
                if (account.status === false){
                    this.logout();
                    return alert('Votre compte a été désactiver');
                }
                else {
                    this.startRefreshTokenTimer();
                    return account;
                }
            }));
    }

    logout() {
        this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    refreshToken() {
        console.log("Dans REFRESHTOKEN");
        return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
            .pipe(map((account) => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    register(account: Account) {
        return this.http.post(`${baseUrl}/register`, account);
    }

    verifyEmail(token: string) {
        return this.http.post(`${baseUrl}/verify-email`, { token });
    }

    forgotPassword(email: string) {
        return this.http.post(`${baseUrl}/forgot-password`, { email });
    }

    validateResetToken(token: string) {
        return this.http.post(`${baseUrl}/validate-reset-token`, { token });
    }

    resetPassword(token: string, password: string, confirmPassword: string) {
        return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
    }

    getCurrentUser(id : string) {
        return new Promise<any>((resolve, reject) =>
        {
         this.http.get('http://localhost:4000/accounts/infos/' + id).subscribe(
           (account) => 
           {
             resolve(account);
               
           },
           (error) =>
           {
             reject(error);
           }
           
         );
          
        }) 
      }

    getAll() {
        return this.http.get<Account[]>(baseUrl);
    }
    
    getAllByAdmin() {
        return this.http.get<Account[]>(`${baseUrl}/admin`);
    }

    getById(id: string) {
        return this.http.get<Account>(`${baseUrl}/${id}`);
    }

    getOneUser(id: string) {
        return this.http.get<Account>(`${baseUrl}/admin/${id}`);
    }

    create(params) {
        return this.http.post(baseUrl, params);
    }

    update(id, params) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((account: any) => {
                // mettre à jour le compte actuel s'il a été mis à jour
                if (account.id === this.accountValue.id) {
                    // publier un compte mis à jour pour les abonnés
                    account = { ...this.accountValue, ...account };
                    this.accountSubject.next(account);
                }
                return account;
            }));
    }
    edit(id, params) {
        return this.http.put(`${baseUrl}/admin/${id}`, params)
            .pipe(map((account: any) => {
                // mettre à jour le compte actuel s'il a été mis à jour
                if (account.id === this.accountValue.id) {
                    // publier un compte mis à jour pour les abonnés
                    account = { ...this.accountValue, ...account };
                    this.accountSubject.next(account);
                }
                return account;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                // déconnexion automatique si le compte connecté a été supprimé
                if (id === this.accountValue.id)
                    this.logout();
            }));
    }

    // méthodes d'assistance

    private refreshTokenTimeout;

    private startRefreshTokenTimer() {
        // analyser l'objet json à partir du jeton jwt encodé en base64
        const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

        // définir un délai pour actualiser le jeton une minute avant son expiration
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }
}
