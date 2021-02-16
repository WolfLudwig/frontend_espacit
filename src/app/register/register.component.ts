import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    pseudo: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor( private authService: AuthService, 
    private route : Router,
    private tokenStorage : TokenStorageService) { }

  ngOnInit() { }

  onSubmit(): void {
    const { pseudo, email, password } = this.form;

    this.authService.register(pseudo, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.tokenStorage.saveToken(data.idToken);
        const user = data.pseudo;
        this.tokenStorage.saveUser(user);
        this.route.navigateByUrl('/actu');
      },
      err => {
        this.isSignUpFailed = true;
        if(err.error.errors.email.length>0)
        {
          this.errorMessage = err.error.errors.email
        }
        else
        {
          this.errorMessage = err.error.errors.pseudo;
        }
        
        
      }
    );
  }
}
