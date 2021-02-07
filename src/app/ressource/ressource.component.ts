import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from './../_services';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit {
  account = this.accountService.accountValue;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

}
