import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() openChat = new EventEmitter<boolean>();
  @Output() menu = new EventEmitter<boolean>();
  public searchForm = new FormGroup({ search: new FormControl('') });
  constructor() { }

  ngOnInit(): void {
  }
  send(e) {
    console.log(e);
    if (e.keyCode === 13) {
      // TODO: WS this.search
    }
  }
}
