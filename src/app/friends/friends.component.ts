import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public friends : Users[] = [];
  private friendsSub: Subscription;
  public currentUser : String;
  public isLogged = false;

  constructor(private userService : UserService,
    private router: Router,
    private tokenStorage : TokenStorageService,
    ) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getUser();
      console.log(this.currentUser + " retour token");
      this.isLogged = true;
    }

   

    this.friendsSub = this.userService.usr$.subscribe(
      (users) => {
        this.friends = users;
      }
    );
    this.userService.getAllUsers();

  }

  goMyFriends(id : string)
  {
    this.router.navigateByUrl('/myFriends/' + id);
  }


}
