import { AccountService } from './../_services';
import { Account } from './../models';
import { Role } from './../models/role';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  Role = Role;
  account: Account;

  @Output() openChat = new EventEmitter<boolean>();

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
   }

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
  }

}
