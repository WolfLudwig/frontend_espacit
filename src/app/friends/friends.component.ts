import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  public friends : Users[] = [];
  private friendsSub: Subscription;

  constructor(private userService : UserService,
    private router: Router,
    ) { }

  ngOnInit(): void {

    this.friendsSub = this.userService.usr$.subscribe(
      (users) => {
        this.friends = users;
      }
    );
    this.userService.getAllUsers();

  }

  goMyFriends(id : string)
  {
    this.router.navigateByUrl('/myFriends/' + id);
  }


}
