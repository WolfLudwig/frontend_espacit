import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: Users;
  user : String;
  @Output() openChat = new EventEmitter<boolean>();
  

  constructor(private token: TokenStorageService,
    private userService : UserService) { }
    

  ngOnInit(){

    console.log("je suis dans l'init profil");
    this.currentUser = this.token.getUser();

    //this.user = this.userService.getUser(this.currentUser._id);
    console.log(this.user + " user récupéré");
    
    
  }
}
