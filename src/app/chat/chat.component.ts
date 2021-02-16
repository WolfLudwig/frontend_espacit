import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Output() openChat = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void 
  {

  }

  createConv()
  {
    
  }

}
