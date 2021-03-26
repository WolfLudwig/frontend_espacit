import { AccountService } from '../_services';
import { Account } from './../models';
import { Role } from './../models/role';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPlaceholder } from '@angular/material/form-field';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  Role = Role;
  account: Account;
  public isLoggedIn = false;
  public searchForm : FormGroup;


  @Output() openChat = new EventEmitter<boolean>();

  constructor(private accountService: AccountService,
    private formBuilder: FormBuilder,) {
    this.accountService.account.subscribe(x => 
      {
        if(x != null)
        {
          this.account = x;
          this.isLoggedIn = true;
        }
        else
        {
          this.isLoggedIn = false;
        }

      });
   }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      userSearch : [],
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.accountService.logout();
  }

  search()
  {
    console.log(this.searchForm.get('userSearch').value)
    console.log("dans search")
  }

}
