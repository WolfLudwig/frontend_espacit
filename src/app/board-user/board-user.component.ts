import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ressource } from '../models/ressource.model';
import { Users } from '../models/user.model';
import { RessourceService } from '../services/ressources.service';
import { UserService } from '../services/users.service';

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


  constructor(private route : ActivatedRoute,
    private userService : UserService,
    private ressourceService : RessourceService
    ) { }

  ngOnInit(): void 
  {
    this.user = new Users();
    this.route.params.subscribe(
      (params: Params) => {
        this.userService.getUser(params.id);
        this.paramId = params.id;
      }
    );

    this.userSub = this.userService.oneUser$.subscribe(
      (result : Users) =>
      {
        this.user = result;
        this.ressourceService.getAllPostsByLikes(this.user._id);
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

    // deleteFriend(id : String)
    // {
    //   console.log(id);
    // }
    

   



  }

}
