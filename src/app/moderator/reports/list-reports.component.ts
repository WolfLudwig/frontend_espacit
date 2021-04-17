import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Ressource } from 'src/app/models';
import { Reports } from 'src/app/models/reports';
import { AccountService, AlertService, CategoryService, RessourceService } from 'src/app/_services';
import { ReportService } from 'src/app/_services/report.service';

@Component({ templateUrl: 'list-reports.component.html' })
export class ListReportsComponent implements OnInit {
    public reportsSuspend: Reports[];
    public reportsUnSuspend : Reports[];
    public reportsSub : Subscription;
    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private reportService : ReportService
    ) {
        this.reportsSub = this.reportService.reps$.subscribe
        (
            (rep : Reports[]) => {
                console.log(rep);

                this.verifyReports(rep)

                
                //this.reports = rep;
            }
        )
        this.reportService.getAllReports();
    }


    ngOnInit() {
        
    }

    verifyReports(rep : Reports[])
    {
        this.reportsSuspend = [];
        this.reportsUnSuspend = [];
        rep.forEach(report =>
            {
                if(report.post.isSuspend == true)
                {
                    this.reportsSuspend.push(report)
                }
                else
                {
                    this.reportsUnSuspend.push(report)
                }
            })

    }

    deleteReportPost(id : String)
    {
        this.reportService.deleteReport(id).then(
            (reports : Reports[]) =>
            {
                this.verifyReports(reports);
            }
        )
            
        console.log(id)
    }

    GoDetails(id : String)
    {
        console.log(id)
        this.router.navigateByUrl("/ressourceDetails/" +id)
    }

    confirmReportPost(idPost : String, idReport : String)
    {
        console.log("DANS COMPONENT AVANT SERVICE")
        this.reportService.confirmReportPost(idPost, idReport).then(
            (reports : Reports[]) =>
            {
                this.verifyReports(reports);
            }
        )
    }

    cancelReportPost(idPost : String, idReport : String)
    {
        console.log("DANS COMPONENT AVANT SERVICE")
        this.reportService.cancelReportPost(idPost, idReport).then(
            (reports : Reports[]) =>
            {
                this.verifyReports(reports);
            }
        )
    }
}
