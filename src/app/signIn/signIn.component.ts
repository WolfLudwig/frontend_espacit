import { Component, Input, OnInit } from '@angular/core';
import {Users} from '../models/user.model';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService} from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent implements OnInit {

  signInForm : FormGroup;
  errorMessage : string;

  constructor(private formBuilder: FormBuilder,
    private userService : UserService, 
    private router: Router,
    private authService : AuthService) { }

  ngOnInit() {

    this.signInForm = this.formBuilder.group({
      email: [null, Validators.required],
      Mdp: [null, Validators.required],

    });
  }

  onSubmit()
  {
    const usr = new Users();
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('Mdp').value;
    this.authService.login(email, password);
    //this.router.navigateByUrl('/home');

  }

}