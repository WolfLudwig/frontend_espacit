import { Component } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public openChat = false;
  public menu = (this.media.isActive('lg') || this.media.isActive('md'));

  constructor(public media: MediaObserver) { }

}
