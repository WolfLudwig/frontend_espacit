import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
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
  private isLoggedIn = false;
  public user :Users;
  public authSub : Subscription

  constructor(private userService : UserService,
    private router: Router,
    private tokenStorage : TokenStorageService,
    private authService : AuthService,
    private route : ActivatedRoute
    
    ) { }

  ngOnInit(): void {

    this.authSub = new Subscription();
    

    this.tokenStorage.usrToken$.subscribe(
      (data : any) =>
      {
        console.log("Dans subscription a usrToken suite au login : findFriends");
        this.user = data;
        this.isLoggedIn = true;
      }
    )

    this.friendsSub = this.userService.usr$.subscribe(
      (users) => {
        console.log(users + " users de find friends");
        this.friends = users;
      }
    );
    this.userService.getAllUsers();

//---------------------A CONSERVER POUR TOKENS----------------------
    //  if (this.tokenStorage.getToken()) {
    //    this.currentUser = this.tokenStorage.getUser();
    //    this.isLogged = true;
    //    console.log(this.currentUser + " currentUser données");
    //   }

    //   this.authSub = this.authService.token$.subscribe(
    //     (tok : any) =>
    //     {
    //       console.log(tok + " token de findFirends");
    //       this.currentUser = tok;
    //       console.log(this.currentUser + " token de findFriends");
          
    //     }  
    //   );
    // this.authService.decodeToken(this.currentUser);
//-----------------------------FIN CONSERVATION--------------------------

      //  this.authSub = this.authService.token$.subscribe(
      //    (tok : any) =>
      //    {
      //      console.log(tok + " token de findFirends");
      //      this.user = tok;
      //      console.log(this.user._id);
      //      console.log(this.user + " token de findFriends");
          
      //    }  
      //  );
    
    

  }

  goMyFriends()
  {
    const user = this.tokenStorage.getToken();
    
    this.router.navigateByUrl('/myFriends');
    
  }

  addFriend(idFriend : String)
  {
    console.log(" je dosi traiter : " + idFriend)
    this.userService.addFriend(idFriend);
  }

  goProfil(id : String)
  {
    console.log(id + " id Récup");
    this.router.navigateByUrl('/profil/' + id);

  }

}
