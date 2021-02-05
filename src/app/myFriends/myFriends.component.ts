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
  public user : Users;
  private  id : any;
  constructor(private userService : UserService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenStorage : TokenStorageService,
    private authService : AuthService,
    ) { }

  ngOnInit(){

    this.userService.getAllFriends().then(
      (usr: Users[]) => {
        this.friends = usr;
      }
    );       

    this.friendsSub = this.userService.frd$.subscribe(
      (users) => {
        this.friends = users;
      }
    );
   


    // this.route.params.subscribe(
    //   (params: Params) => {

    //     this.user = new Users();
    //     this.user = {_id : params._id,
    //                  pseudo : params.pseudo,
    //                  email : params.email,
    //                  password :params.password};

    //                 }
    //   );

//-----------------------------A CONSERVER POUR LES TOKENS----------------------------
    //  this.authSub = new Subscription();

    //   if (this.tokenStorage.getToken()) {
    //     this.currentUser = this.tokenStorage.getUser();
       
    //    }

    //    console.log(this.currentUser + " avant de décoder");
      
    //    this.authSub = this.authService.decodedToken$.subscribe
    //      (
    //      (resp : String) =>
    //      {
    //        if(resp)
    //        {
    //          console.log(resp);
    //          this.id = resp;
    //          console.log(this.id + " dans goMyFriends");
    //          this.userService.getAllFriends(this.id).then(
    //            (usr: Users[]) => {
    //              this.friends = usr;
    //            }
    //          );       
    //        }
    //      }
    //    );
    //    this.authService.decodeToken(this.currentUser);


    // this.authSub = this.authService.token$.subscribe(
    //   (tok : String) =>
    //   {
    //     console.log("jai mon token de subscription ! ")
    //     this.usr = tok;
    //     console.log(this.usr);
    //   }  
    // );
//--------------------------FIN CONSERVATION----------------------------------
   
  }

  deleteFriend(idFriend : String)
  {
    this.userService.deleteFriend(idFriend);
  }

  goProfil(id : String)
  {
    console.log(id + " id Récup");
    this.router.navigateByUrl('/profil/' + id);

  }


}
