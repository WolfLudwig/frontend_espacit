import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account, Ressource } from '../models';

import { AccountService, RessourceService } from '../_services';

@Component({ templateUrl: 'details.component.html',
            styleUrls: ['./details.component.css'] })
export class DetailsComponent {

    public paramId;
    public user : Account;
    public ressource : Ressource[];
    public ressourceSub : Subscription;
    

    constructor(private accountService: AccountService,
        private route : ActivatedRoute,
        private ressourceService : RessourceService,
        private router : Router) 
        { 
            this.user = this.accountService.accountValue;
    }

    ngOnInit(): void 
    {
       this.route.params.subscribe(
         (params: Params) => {
           if (params.id?.length>0)
           {
             console.log("paramètres pour aller vers un autre utlisateur")
            this.paramId = params.id;
            
            this.ressourceService.getAllPostsByLikes(params.id);

           console.log(this.paramId + " id params");
  
           }
           else
           {
             console.log(this.user.id + " dans userboard")
             this.ressourceService.getAllPostsByLikes(this.user.id);
  
           }
         }
       );
  ;
  this.ressourceSub = this.ressourceService.post$.subscribe(
    (ress : Ressource[]) =>
    {
      if(ress)
      {
          console.log(ress);
        this.ressource = ress;
      }

    }  
  );
    }

    ressourceDetails(id : String)
    {
      console.log(id + " idressource");
      this.router.navigateByUrl('/ressourceDetails/' + id)
    }

    unLike(idRess : String)
    {
      this.user = this.accountService.accountValue;
      console.log(this.user.id);
      this.ressourceService.unLike(idRess, this.user.id).then(
        () =>
        {
          this.accountService.getCurrentUser(this.user.id).then(
            (account : Account) =>
            {
                this.ressourceService.getAllPostsByLikes(this.user.id);
            }
          )
  
        }
      )

    }
}
