import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }
  public menu = [
    { icone: 'home', nom: 'Fil d\'actualité', lien: '/actu' },
    { icone: 'article', nom: 'Mon fil', lien: '/actu' },
    { icone: 'gamepad', nom: 'Jeux', lien: '/jeu' },
    { icone: 'explore', nom: 'Explorer', lien: '/groupe' },
    { icone: 'groups', nom: 'Groupes', lien: 'groupe' },
    { icone: 'person_add', nom: 'Retrouver des amis', lien: '/findFriends'},
    { icone: 'supervised_user_circle', nom: 'Créer un admin', lien: '/createUser'},
    { icone: 'people_outline', nom: 'Liste des utilisateurs', lien: '/userList'}
  ];

  ngOnInit(): void {

  }

}
