import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  public usr : String;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, 
    private router : Router,
    private route : ActivatedRoute,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.authSub = new Subscription();

     if (this.tokenStorage.getToken()) {
       this.currentUser = this.tokenStorage.getUser();
      }

    this.authSub = this.authService.token$.subscribe(
      (tok : String) =>
      {
        console.log("jai mon token de subscription ! ")
        this.usr = tok;
        console.log(this.usr);
        
      }  
    );
    this.authService.decodeToken(this.currentUser);
    
    this.form = this.formBuilder.group({
      email : [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    const email = this.form.get('email').value;
    const pass = this.form.get('password').value;
    console.log(email, pass + " onSubmit");

    this.authService.login(email, pass).subscribe(
      (data) => {
        console.log (data + " data sortie login");

        this.tokenStorage.saveToken(data.idToken);
        this.tokenStorage.saveUser(data.idToken);
        console.log(data.idToken + " idToken de methode login");

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.submitted = true;
        this.roles = this.tokenStorage.getUser();

        console.log(this.roles + " roles");

        console.log("avant d'aller vers home");
        this.router.navigateByUrl('/actu');

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
