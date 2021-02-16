import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from './models/user.model';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'app';
//   public openChat = false;
// }
export class AppComponent implements OnInit {
  // private roles: string[] = [];
  // isLoggedIn = false;
  // showAdminBoard = false;
  // showModeratorBoard = false;
  // pseudo?: string;
  title = 'app';
  public openChat = false;
  public createConv = false;
  public authSub : Subscription;
  public currentUser : String;
  private usr : Users;
  public isLoggedIn = false;


  constructor(private tokenStorage: TokenStorageService,
    private authService : AuthService,
    private route : Router
    ) { }
  ngOnInit(): void {

    this.authSub = new Subscription();

    if (this.tokenStorage.getToken()) {
      this.currentUser = this.tokenStorage.getToken();
      const usr = this.tokenStorage.getUser();
      this.isLoggedIn = true;
     }
     else
     {
       console.log(" je vais à la connexion");
       this.route.navigateByUrl('/');
     }

   this.authSub = this.authService.user$.subscribe(
     (tok : any) =>
     {
       this.usr = tok;
       
     }  
   );

  //   this.authSub = new Subscription();

  //    if (this.tokenStorage.getToken()) {
  //      this.currentUser = this.tokenStorage.getUser();
       
  //     }

  //   this.authSub = this.authService.token$.subscribe(
  //     (tok : String) =>
  //     {
  //       console.log("jai mon token de subscription ! ")
  //       this.usr = tok;
  //       console.log(this.usr);
  //     }  
  //   );
  //   this.authService.decodeToken(this.currentUser);

  // }

  // public getUser()
  // {
  //   return this.usr;
  // }
  }

  // logout(): void {
  //   this.tokenStorageService.signOut();
  //   window.location.reload();
  // }
}
