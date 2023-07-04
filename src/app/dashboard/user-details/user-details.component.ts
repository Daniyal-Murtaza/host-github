import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  country: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user!: User;
  userForm!: FormGroup;

  isSaveButtonEnabled: boolean = true;
  isCreateButtonDisabled: boolean = true;
  isSearchInputDisabled: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.user = this.getUserById(userId);
      this.createForm();
    });
  }

  getUserById(userId: number): User {
    return {
      id: userId,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      street: '123 Main St',
      city: 'City',
      zipcode: '12345',
      country: 'Country'
    };
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      street: [this.user.street, [Validators.required]],
      city: [this.user.city, [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      zipcode: [this.user.zipcode, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      country: [this.user.country, [Validators.required]]
    });
  }

  saveUser() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        id: this.user.id,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        street: this.userForm.value.street,
        city: this.userForm.value.city,
        zipcode: this.userForm.value.zipcode,
        country: this.userForm.value.country,
      };

      // Update the user data or send it to the server

      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }
}
