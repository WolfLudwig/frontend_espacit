import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/user';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Account } from '../models';
import { AccountService } from '../_services';

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
  public user : Users;
  public account : Account;
  private  id : any;
  constructor(private userService : UserService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService : AccountService

    ) { 
      this.account = accountService.accountValue;
    }

  ngOnInit(){

    // this.userService.getAllFriends(this.account.id).then(
    //   (usr: Users[]) => {
    //     console.log(usr);
    //     this.friends = usr;
    //   }
    // );       

    this.friendsSub = this.userService.frd$.subscribe(
      (users : Users[]) => {
        console.log(typeof(this.friends))
        this.friends = users;
        console.log(this.friends);
      }
    );
    this.userService.getAllMyFriends(this.account.id);
   
   
  }

  deleteFriend(idFriend : String)
  {
    console.log(idFriend)
    this.userService.deleteFriend(idFriend, this.account.id);
  }

  goProfil(id : String)
  {
    console.log(id + " id Récup");
    this.router.navigateByUrl('/profil/' + id);

  }


}
