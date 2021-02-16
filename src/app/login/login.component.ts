import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Users } from '../models/user.model';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup; 

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  submitted = false;
  public currentUser : String;
  public authSub : Subscription;
  public usr : Users;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, 
    private router : Router,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.authSub = new Subscription();

    //  if (this.tokenStorage.getToken()) {
    //    this.currentUser = this.tokenStorage.getUser();
    //    this.isLoggedIn = true
    //   }

    // this.authSub = this.authService.token$.subscribe(
    //   (tok : String) =>
    //   {
    //     console.log("jai mon token de subscription ! ")
    //     this.usr = tok;
    //     console.log(this.usr + " token de login");
        
    //   }  
    // );
    
    this.form = this.formBuilder.group({
      email : [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    
    const email = this.form.get('email').value;
    const pass = this.form.get('password').value;
    console.log(email, pass + " onSubmit");

    // this.authService.user$.subscribe(
    //   data =>
    //   {
    //     if(data)
    //     {
    //       console.log(data)
    //       this.user = data;
    //       console.log(data + " data souscription login");

    //       this.tokenStorage.saveToken(data.idToken);
    //     const user ={pseudo : data.pseudo, email : data.email}
    //     this.tokenStorage.saveUser(user);
  
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.submitted = true;
  
    //     this.router.navigateByUrl('/actu');
    //     }

    //   }
    // )


    this.authService.login(email, pass).then(
      (data : any)  => {
        console.log(data)
  
        this.tokenStorage.saveToken(data.idToken);
        const user = data.pseudo;
        this.tokenStorage.saveUser(user);
  
        this.isLoginFailed = false;
        this.isLoggedIn = true;
  
        this.router.navigateByUrl('/actu');
  
      },
      (err) => {
        console.log( "je ne suis aps co ");
        this.submitted = false;
        this.errorMessage = "Adresse mail ou mot de passe non valide"
        this.isLoginFailed = true;
      }
    );

  }
  

 
  reloadPage(): void {
    window.location.reload();
  }
}
