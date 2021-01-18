import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService : UserService,
    private route : Router) { }

  ngOnInit(): void {
  }

  searchFriends()
  {
    this.route.navigateByUrl('/friends');
    this.userService.getAllUsers();
    
  }

}
