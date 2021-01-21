import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route : Router, private userService : UserService) { }

  ngOnInit() {
    this.userService.isLog()
    .then(res => console.log(res))
    .catch(err => console.log("Citoyen non connecté " + err));


  }

}
