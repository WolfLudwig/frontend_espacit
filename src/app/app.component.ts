import { Component, OnInit} from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'app';
  public openChat = false;

  constructor() { }
  
  ngOnInit(): void {
   
  }


}
