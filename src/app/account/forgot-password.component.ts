import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';

@Component({ templateUrl: 'forgot-password.component.html' })
export class ForgotPasswordComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    // getter pratique pour un accès facile aux champs de formulaire
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // réinitialiser les alertes lors de l'envoi
        this.alertService.clear();

        // arrêtez-vous ici si le formulaire est invalide
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.alertService.clear();
        this.accountService.forgotPassword(this.f.email.value)
            .pipe(first())
            .pipe(finalize(() => this.loading = false))
            .subscribe({
                next: () => this.alertService.success('Please check your email for password reset instructions'),
                error: error => this.alertService.error(error)
            });
    }
}
