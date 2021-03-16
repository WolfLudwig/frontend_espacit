import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../models';
import { Users } from '../models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css']
})
export class FindFriendsComponent implements OnInit {

  public friends : Users[] = [];

  constructor(private router: Router,
    private route : ActivatedRoute,
    private userService : UserService) { }

  ngOnInit(): void {

    this.userService.getAllUsers().then(
      (users : Users[]) => {
        console.log(users + " users de find friends");
        this.friends = users;
      }
    );
  }

  goMyFriends()
  {
    
    this.router.navigateByUrl('/myFriends');
    
  }

  // addFriend(idFriend : String)
  // {
  //   console.log(" je dosi traiter : " + idFriend)
  //   this.userService.addFriend(idFriend);
  // }

  // goProfil(id : String)
  // {
  //   console.log(id + " id Récup");
  //   this.router.navigateByUrl('/profil/' + id);

  // }

}
