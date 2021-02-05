import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ressource } from '../models/ressource.model';
import { Users } from '../models/user.model';
import { RessourceService } from '../services/ressources.service';
import { UserService } from '../services/users.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})


export class BoardUserComponent implements OnInit {

  @Output() openLikes = new EventEmitter<boolean>();

  public userSub : Subscription;
  public ressourceSub : Subscription;
  public user : Users;
  public ressource : Ressource[] = [];
  public paramId;
  public authSub : Subscription;
  public currentUser : String;


  constructor(private route : ActivatedRoute,
    private userService : UserService,
    private ressourceService : RessourceService,
    private authService : AuthService,
    private tokenStorageService : TokenStorageService
    ) { }

  ngOnInit(): void 
  {
     this.route.params.subscribe(
       (params: Params) => {
         if (params.id?.length>0)
         {
           console.log("paramètres pour aller vers un autre utlisateur")
          this.paramId = params.id;
          this.userService.getUser(params.id).then(
            (resp : Users) =>
            {
              this.user = resp;
              console.log(this.user.pseudo);
              this.ressourceService.getAllPostsByLikes(this.user._id);
            }
          )
         console.log(this.paramId + " id params");

         }
         else
         {
           this.userService.getCurrentUser().then(
            (resp : Users) =>
            {
              this.user = resp;
              this.ressourceService.getAllPostsByLikes(this.user._id);
            }            
           )
         }
       }
     );
;

    

    this.userSub = this.userService.oneUser$.subscribe(
      (result : Users) =>
      {
        console.log(result);
        this.user = result;
        this.ressourceService.getAllPostsByLikes(this.currentUser);
      },
    )

   

    this.ressourceSub = this.ressourceService.post$.subscribe(
      (ress : Ressource[]) =>
      {
        if(ress)
        {
          this.ressource = ress;
        }

      }  
    );
  }

}
