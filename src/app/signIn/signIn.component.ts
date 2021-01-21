import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../models/user.model';
import { UserService } from '../services/users.service';


@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
  styleUrls: ['./signIn.component.css']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.signInForm = this.formBuilder.group({
      email: [null, Validators.required],
      Mdp: [null, Validators.required],

    });
  }

  onSubmit(): void {
    const usr = new Users();
    usr.email = this.signInForm.get('email').value;
    usr.password = this.signInForm.get('Mdp').value;
    this.userService.signInUser(usr);
    this.router.navigateByUrl('/home');

  }

}
