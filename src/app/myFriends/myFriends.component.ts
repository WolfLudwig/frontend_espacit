import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-my-friends',
  templateUrl: './myFriends.component.html',
  styleUrls: ['./myFriends.component.css']
})
export class MyFriendsComponent implements OnInit {

  public friends : Users[] = [];
  private friendsSub: Subscription;
  public authSub : Subscription;
  public currentUser : String;
  public usr : String;

  constructor(private userService : UserService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenStorage : TokenStorageService,
    private authService : AuthService,
    ) { }

  ngOnInit(){

    this.authSub = new Subscription();

     if (this.tokenStorage.getToken()) {
       this.currentUser = this.tokenStorage.getUser();
       
      }

    this.authSub = this.authService.token$.subscribe(
      (tok : String) =>
      {
        console.log("jai mon token de subscription ! ")
        this.usr = tok;
        console.log(this.usr);
      }  
    );
    this.authService.decodeToken(this.currentUser);

    this.friendsSub = this.userService.frd$.subscribe(
      (users) => {
        this.friends = users;
      }
    );
    this.route.params.subscribe(
      (params: Params) => {
        this.userService.getAllFriends(params.id).then(
          (usr: Users[]) => {
            this.friends = usr;
          }
        );
      }
    );
  }

  deleteFriend(idFriend : String)
  {
    this.userService.deleteFriend(idFriend, this.usr);
  }

  goProfil(id : String)
  {
    console.log(id + " id Récup");
    this.router.navigateByUrl('/profil/' + id);

  }


}
