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
import { ToolbarComponent } from '../toolbar/toolbar.component';

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
  answerForm : FormGroup;
  user: Users;



  public authSub : Subscription;
  public currentUser : Users;
  public error = false;
  public errorMessage : String;
  public tokenSub : Subscription;

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
      this.currentUser = this.tokenStorage.getUser();
      console.log(this.currentUser)
      

      // this.route.params.subscribe(
      //   (params: Params) => {

      //     this.user = new Users();
      //     this.user = {_id : params._id,
      //                  pseudo : params.pseudo,
      //                  email : params.email,
      //                  password :params.password};

      //                 }
      //   );

      this.authSub = new Subscription();
      // this.tokenSub = new Subscription();

      // this.tokenSub = this.tokenStorage.usrToken$.subscribe(
      //   (tok) =>
      //   {
      //     this.usr = tok;
      //     console.log(this.usr + " token suite sub tokenStorage");
      //   }
      // );

//--------------------A CONSERVER POUR LES TOKENS---------------------------------------
      // this.authSub = this.authService.token$.subscribe(
      //   (tok : String) =>
      //   {
      //     this.currentUser = tok;
      //     console.log(this.currentUser + " user observable authService ressource");
      //   }  
      // );

      //  if (this.tokenStorage.getToken()) {
      //    this.currentUser = this.tokenStorage.getUser();

      //     console.log(" token récupé après getUser : " + this.currentUser);
      //     this.isLogged = true;
      //  }
      //  else
      //  {
      //   this.error = true;
      //   this.errorMessage ="Veuillez vous connexter pour profiter de l'intégralité des fonctionnalités";  
      //  }
//---------------------------------------------------------------------------------------


      this.userService.getCurrentUser().then(
        (resp : Users) =>
        {
          this.user = resp;
          console.log(this.user);
        }
      );
      


      this.ressourcesSub = new Subscription();

       this.commentForm = this.formBuilder.group({
         userComm: [null],
       });
       this.answerForm = this.formBuilder.group({
         answer : [null]
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

      const infos = {id : event, _id : this.user._id};

      this.ressourcesSub = this.ressourceService.post$.subscribe(
        (ress) =>
        {
          //console.log(ress);

        });

      
       this.ressourceService.addLike(infos);
      
    }

    addComment(idRess : string, commId : string, pseudo : string)
    {

      
      console.log(this.user + " comment ");
      
      const infos = {idress : idRess, 
                    message : this.commentForm.get('userComm').value
                  };

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

    askComment(posterId : String, pseudo : String,  idRess : String)
    {
      console.log(" dans ask répondre à : " + posterId);
      console.log(" dans ask pour la ressource " + idRess);
      console.log(this.answerForm.get('answer').value);
      const resp = {idPost : idRess, pseudo : pseudo, idAnswer :posterId, message :  this.answerForm.get('answer').value }

      this.ressourceService.askComm(resp)

      

    }

}
