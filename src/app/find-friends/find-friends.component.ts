import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css']
})
export class FindFriendsComponent implements OnInit {

  public friends : Users[] = [];
  private friendsSub: Subscription;
  private currentUser : String;
  private isLogged = false;
  public usr :String;
  public authSub : Subscription

  constructor(private userService : UserService,
    private router: Router,
    private tokenStorage : TokenStorageService,
    private authService : AuthService,
    
    ) { }

  ngOnInit(): void {
    this.authSub = new Subscription();

     if (this.tokenStorage.getToken()) {
       this.currentUser = this.tokenStorage.getUser();
       this.isLogged = true;
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

    this.friendsSub = this.userService.usr$.subscribe(
      (users) => {
        this.friends = users;
      }
    );
    this.userService.getAllUsers();
    

  }

  goMyFriends(id : String)
  {
    console.log(id + " dans goMyFriends");
    this.router.navigateByUrl('/myFriends/' + id);
  }

  addFriend(idFriend : String)
  {
    this.userService.addFriend(idFriend, this.usr);
  }

  goProfil(id : String)
  {
    console.log(id + " id Récup");
    this.router.navigateByUrl('/profil/' + id);

  }

}
