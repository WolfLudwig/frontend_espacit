import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from './../models';
import { AlertService } from './../_services';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })

export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;

    constructor(private router: Router, private alertService: AlertService) { }

    ngOnInit() {
        // s'abonner aux nouvelles notifications d'alerte
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                // effacer les alertes lorsqu'une alerte vide est reçue
                if (!alert.message) {
                    // filtrer les alertes sans l'indicateur 'keepAfterRouteChange'
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    // supprimer le drapeau 'keepAfterRouteChange' sur le reste
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                // ajouter une alerte au tableau
                this.alerts.push(alert);

                // alerte de fermeture automatique si nécessaire
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
           });

        // effacer les alertes en cas de changement d'emplacement
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    ngOnDestroy() {
        // se désabonner pour éviter les fuites de mémoire
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    removeAlert(alert: Alert) {
        // vérifier si déjà supprimé pour éviter une erreur lors de la fermeture automatique
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            // alerte de fondu
            alert.fade = true;

            // supprimer l'alerte après avoir disparu
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // supprimer l'alerte
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    cssClasses(alert: Alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }
}
