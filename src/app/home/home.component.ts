import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route : Router, private userService : UserService,
    private tokenStorage: TokenStorageService,) { }

    public isLoggedIn = false;
    roles: string[] = [];

  ngOnInit() {
    
    if (this.tokenStorage.getToken()) {
      console.log("jai mon token ");
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser();
    }
   

  }

}
