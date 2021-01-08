import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  public menu = [
    { icone: 'home', nom: 'Fil d\'actualité', lien: '/actu' },
    { icone: 'article', nom: 'Articles populaires', lien: '/actu' },
    { icone: 'event', nom: 'Événements', lien: '/events' },
    { icone: 'gamepad', nom: 'Jeux', lien: '/jeu' },
    { icone: 'person_search', nom: 'Retrouver des amis', lien: '/friends' },
    { icone: 'explore', nom: 'Explorer', lien: '/groupe' }
  ];

  ngOnInit(): void {
  }

}
