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
    { icone: 'article', nom: 'Mon fil', lien: '/actu' },
    { icone: 'gamepad', nom: 'Jeux', lien: '/jeu' },
    { icone: 'explore', nom: 'Explorer', lien: '/groupe' },
    { icone: 'groups', nom: 'Groupes', lien: 'groupe' }
  ];

  ngOnInit(): void {
  }

}
