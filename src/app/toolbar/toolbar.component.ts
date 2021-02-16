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
  public user : String

  @Output() openChat = new EventEmitter<boolean>();

  constructor(private tokenStorageService: TokenStorageService,
    private authService : AuthService,
    private route : Router,
    private userService : UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();


    this.tokenStorageService.usrToken$.subscribe(
      (data : any) =>
      {
        this.user = data;
        this.isLoggedIn = true;
      }
    )
  }

  profil(id : String)
  {
    this.route.navigateByUrl('/profil');
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
