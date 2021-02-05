import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public friends : Users[] = [];
  private friendsSub: Subscription;
  public currentUser : Users;
  public isLogged = false;
  public authSub : Subscription;

  constructor(private userService : UserService,
    private router: Router,
    private tokenStorage : TokenStorageService,
    private authService : AuthService
    ) { }

  ngOnInit(): void {

    this.authSub = this.authService.token$.subscribe(
      (tok : any) =>
      {
        console.log("jai mon token de subscription ! ")
        this.currentUser = tok;
        console.log(this.currentUser + " token de app component");
        
      }  
    );


   

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
