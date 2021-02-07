import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './../_services';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // rediriger vers la maison si déjà connecté
        if (this.accountService.accountValue) {
            this.router.navigate(['/']);
        }
    }
}
