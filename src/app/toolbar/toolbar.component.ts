import { TokenStorageService } from './../_services/token-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  private roles: String;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  public authSub : Subscription;
  public usr : any

  @Output() openChat = new EventEmitter<boolean>();

  constructor(private tokenStorageService: TokenStorageService,
    private authService : AuthService,
    private route : Router,
    private userService : UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.tokenStorageService.getUser()) {
      let user = this.tokenStorageService.getUser();
      this.roles = this.authService.decodeToken(user);

      

      // this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      // this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.authSub = this.authService.token$.subscribe(
      (tok : String) =>
      {
        console.log("jai mon token de subscription ! ")
        this.roles = tok;
        console.log(this.roles);
      }  
    );
  }

  profil(id : String)
  {
    this.route.navigateByUrl('/profil/' + id);
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
