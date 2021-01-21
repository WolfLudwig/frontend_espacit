import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-my-friends',
  templateUrl: './myFriends.component.html',
  styleUrls: ['./myFriends.component.css']
})
export class MyFriendsComponent implements OnInit {

  public friends: Users[] = [];
  private friendsSub: Subscription;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.friendsSub = this.userService.frd$.subscribe(
      (users) => {
        this.friends = users;
      }
    );
    this.route.params.subscribe(
      (params: Params) => {
        this.userService.getAllFriends(params.id).then(
          (usr: Users[]) => {
            this.friends = usr;
          }
        );
      }
    );
  }


}
