import { TokenStorageService } from './../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

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
  public authSub : Subscription;

  public user : String;

  constructor(private tokenStorageService: TokenStorageService,private userService : UserService,
    private route : Router,
    private authService : AuthService) { }
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


    

    // this.authService.checkUser(this.tokenStorageService.getUser()).subscribe(
    //   (resp : Users) =>
    //   {
    //     this.user = resp;
    //     console.log(resp + " response sidebar user récup");
    //   }
    // )
    this.tokenStorageService.usrToken$.subscribe(
      (data : any) =>
      {
        console.log("Dans subscription a usrToken suite au login");
        this.user = data;
        this.isLoggedIn = true;
      }
    )


    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn + " vérification si user is logged");

     this.authSub = this.authService.token$.subscribe(
       (data : any) => {

         this.user = data;
         console.log(this.user + " data Side bar");
  
         this.isLoggedIn = true;
      
  
       }
     );


  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  searchFriends()
  {
    this.route.navigateByUrl('/findFriends/' + this.user);
    this.userService.getAllUsers();
    
  }

}
