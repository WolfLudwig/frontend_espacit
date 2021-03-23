import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from '../models';
import { Users } from '../models/user';
import { AccountService } from '../_services';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css']
})
export class FindFriendsComponent implements OnInit {

  public friends : Users[] = [];
  public account : Account;
  public userSub : Subscription;

  constructor(private router: Router,
    private route : ActivatedRoute,
    private userService : UserService,
    private accountService : AccountService) 
    { 
      this.account = this.accountService.accountValue;
    }

  ngOnInit(): void {

    this.userSub = this.userService.frd$.subscribe(
      (users : Users[]) => {
        console.log( " users de find friends")
        console.log(users );
        this.friends = users;
      }
    );
    this.userService.getAllFriends(this.account.id);
  }
  

  goMyFriends()
  {
    
    this.router.navigateByUrl('/myFriends' );
    
  }

   addFriend(idFriend : String)
   {
     console.log(" je dosi traiter : " + idFriend)
     this.userService.addFriend(idFriend, this.account.id);
   }

  // goProfil(id : String)
  // {
  //   console.log(id + " id Récup");
  //   this.router.navigateByUrl('/profil/' + id);

  // }

}
