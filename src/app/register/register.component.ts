import { Component, Input, OnInit } from '@angular/core';
import {Users} from '../models/user.model';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService} from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  constructor(private formBuilder: FormBuilder,
    private userService : UserService,) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      pseudo: [null, Validators.required],
      email: [null, Validators.required],
      Mdp: [null, Validators.required],
      confMdp: [null, Validators.required]
    });
  }

  onSubmit()
  {
    const usr = new Users();
    usr.pseudo = this.registerForm.get('pseudo').value;
    usr.email = this.registerForm.get('email').value;
    usr.password = this.registerForm.get('Mdp').value;
    console.log(usr);
    this.userService.createNewUser(usr);
    
  }

}