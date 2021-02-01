import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Ressource } from '../models/ressource.model';
import { RessourceService } from '../services/ressources.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';
import { AuthService } from '../_services/auth.service';
import { AuthInterceptor } from '../_helpers/auth.interceptor';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {

  public ressources : Ressource[] = [];

  public isLogged = false;

  public ressourcesSub : Subscription;
  commentForm : FormGroup;
  user: string;
  public monObservable : Observable<any>;

  public authSub : Subscription;
  public currentUser : String;
  public usr : String;

  constructor(private ressourceService : RessourceService,
  
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private data: RessourceService,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private authService : AuthService,
    private authInterceptor : AuthInterceptor
    ) { }

    ngOnInit(){
       if (this.tokenStorage.getToken()) {
         this.currentUser = this.tokenStorage.getUser();
         console.log(" token récupé après getUser : " + this.currentUser);
         this.isLogged = true;
         console.log( " J'ai mon token !! ");
       }

       this.authSub = new Subscription();


    this.authSub = this.authService.token$.subscribe(
      (tok : String) =>
      {
        console.log("jai mon token de subscription ! ")
        this.currentUser = tok;
        console.log(this.currentUser);
      }  
    );

      this.ressourcesSub = new Subscription();

       this.commentForm = this.formBuilder.group({
         userComm: [null],
       });

         this.ressourcesSub = this.ressourceService.post$.subscribe(
           (ress : Ressource[]) =>
           {
             this.ressources = ress;
           }  
         );

        this.ressourceService.getAllPosts();

 
    }

    like(event)
    {  
      console.log(this.currentUser + " je dois décoder ça ! ");
      const idUsr = this.authService.decodeToken(this.currentUser);
      console.log(idUsr);
      console.log(this.currentUser);
      const infos = {id : event, idUsr : idUsr};



      this.ressourcesSub = this.ressourceService.post$.subscribe(
        (ress) =>
        {
          //console.log(ress);

        });

      
       this.ressourceService.addLike(infos);
      
    }

    addComment(idRess : string, commId : string, pseudo : string)
    {
      const idUsr = this.tokenStorage.getUser()
      
      const infos = {idress : idRess, 
                    posterId : idUsr,
                    posterName :  pseudo, 
                    message : this.commentForm.get('userComm').value
                  };
        let count = 0;

        this.ressourcesSub = this.ressourceService.post$.subscribe(
          (ress) =>
          {
            //console.log(ress);

          });
          this.ressourceService.createNewComm(infos)
          .then(
          () =>
          {
            this.commentForm.get('userComm').reset();
          }
        )   

      //  this.ressourceService.post$.createNewComm(infos)
      //  .then(
      //    (ress : Ressource[]) =>
      //    {
      //      this.ressources = ress
      //      this.commentForm.get('userComm').reset();
      //    }
      //  )
      

    }

}
