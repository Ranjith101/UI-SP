import { UserService } from './../../user.service';
// user-form.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router  // Inject Router service
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        () => {
          console.log('User created successfully.');
          this.router.navigate(['/list']); // Navigate to list after successful creation
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    } else {
      console.error('Form validation failed.');
    }
  }
}
