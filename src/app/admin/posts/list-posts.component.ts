import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Ressource } from 'src/app/models';
import { AccountService, AlertService, CategoryService, RessourceService } from 'src/app/_services';

@Component({ templateUrl: 'list-posts.component.html' })
export class ListPostsComponent implements OnInit {
    public posts: Ressource[];
    public postSub : Subscription;
    

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private ressourceService : RessourceService
    ) {
        this.postSub = this.ressourceService.post$.subscribe
        (
            (ress : Ressource[]) => {
                console.log(ress);
                this.posts = ress;
            }
        )
        this.ressourceService.getAllPostsAdmin();
    }

    ngOnInit() {
        
    }

    deletePost(id : String)
    {
        this.ressourceService.delepost(id);
        console.log(id)
    }
    GoDetails(id : String)
    {
        this.router.navigateByUrl("/ressourceDetails/" +id)
    }
}
