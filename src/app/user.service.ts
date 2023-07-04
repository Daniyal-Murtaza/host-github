import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { User } from './dashboard/users/users.component';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  country: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private newUserSubject = new Subject<User>();

  newUser$ = this.newUserSubject.asObservable();

  addNewUser(user: User) {
    this.newUserSubject.next(user);
  }
}
