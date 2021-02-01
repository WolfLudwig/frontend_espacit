import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
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
  public authSub : Subscription;
  public currentUser : String;
  private usr : String;


  constructor(private tokenStorage: TokenStorageService,
    private authService : AuthService
    ) { }
  ngOnInit(): void {

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
