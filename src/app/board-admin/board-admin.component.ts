import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { Ressource } from '../models/ressource.model';
import {RessourceService} from '../services/ressources.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  @Input() myPosts : Ressource[];
  @Output() myPostsChange =  new EventEmitter();

  constructor(private ressourceService : RessourceService) { }

  ngOnInit(): void {
  }

}
