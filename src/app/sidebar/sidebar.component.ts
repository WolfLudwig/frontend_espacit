import { TokenStorageService } from './../_services/token-storage.service';
import { AccountService } from '../_services';
import { Account, Role } from './../models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  Role = Role;
  account: Account;

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private accountService: AccountService) { this.accountService.account.subscribe(x => this.account = x);}
  public menu = [
    //Part non connectée
    { icone: 'login', nom: 'Se connecter', lien: '/account/login' },
    { icone: 'assignment_ind', nom: 'S\'inscrire', lien: '/account/register' },
    //Part connectée
    { icone: 'home', nom: 'Fil d\'actualité', lien: '/actu' },
    { icone: 'article', nom: 'Mon fil', lien: '/actu' },
    { icone: 'gamepad', nom: 'Jeux', lien: '/jeu' },
    { icone: 'explore', nom: 'Explorer', lien: '/groupe' },
    { icone: 'groups', nom: 'Groupes', lien: 'groupe' },
    { icone: 'person_add', nom: 'Retrouver des amis', lien: '/findFriends'},
    //Part admin
    { icone: 'supervised_user_circle', nom: 'Créer un admin', lien: '/createUser'},
    { icone: 'people_outline', nom: 'Liste des utilisateurs', lien: '/userList'}


  ];

  ngOnInit(): void {

  }

}
