import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fa, faker } from '@faker-js/faker';
import { UserService } from '../../user.service';


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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchText: string = '';

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.generateDummyUsers();
    this.userService.newUser$.subscribe((user) => {
      this.users.push(user);
      this.filteredUsers.push(user);
    });
  }

  generateDummyUsers() {
    const firstNames = [
      'John',
      'Jane',
      'Michael',
      'Walter',
      'David',
      'Maria',
      'Charles',
      'Patrick',
      'Robert',
      'Jennifer',
      'Kelly',
      'Zayn',
      'Caston',
      'Barbaro',
      'kentaro',
    ];
    const lastName = [
      'Doe',
      'Smith',
      'Johnson',
      'Williams',
      'Jones',
      'Brown',
      'Davis',
      'Miller',
      'Wilson',
      'Moore',
      'Taylor',
      'Anderson',
      'Thomas',
      'Jackson',
      'White',
    ];
    const email = [
      'johndoe@gmail.com',
      'janesmith@gmail.com',
      'michaeljohnson@gmail.com',
      'walterwilliams@gmail.com',
      'davidjones@gmail.com',
      'mariabrown@gmail.com',
      'charlesdavis@gmail.com',
      'PatrickMiller@gmail.com',
      'robertwilson@gmail.com',
      'Jennifermoore@gmail.com',
      'kellytaylor@gmail.com',
      'zaynanderson@gmail.com',
      'castonthomas@gmail.com',
      'barbarojackson@gmail.com',
      'kentarowhite@gmail.com',
    ];
    const street = [
      '123 Main Street',
      '456 1st Street',
      '789 2nd Street',
      '321 3rd Street',
      '654 4th Street',
      '987 5th Street',
      '741 6th Street',
      '852 7th Street',
      '963 8th Street',
      '159 9th Street',
      '753 10th Street',
      '258 11th Street',
      '456 12th Street',
      '753 13th Street',
      '951 14th Street',
    ];
    const city = [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
      'Austin',
      'Jacksonville',
      'Fort Worth',
      'Columbus',
      'Charlotte',
    ];
    const zipcode = [
      '10001',
      '90001',
      '60601',
      '77001',
      '85001',
      '19101',
      '78201',
      '92101',
      '75201',
      '95101',
      '73301',
      '32201',
      '76101',
      '43201',
      '28201',
    ];
    const country = [
      'United States',
      'Morocco',
      'Argentina',
      'Brazil',
      'Canada',
      'China',
      'France',
      'Germany',
      'India',
      'Italy',
      'Japan',
      'Mexico',
      'Russia',
      'South Africa',
      'South Korea',
    ];

    for (let i = 0; i < firstNames.length; i++) {
      const user = {
        id: i + 1,
        firstName: firstNames[i],
        lastName: lastName[i],
        email: email[i],
        street: street[i],
        city: city[i],
        zipcode: zipcode[i],
        country: country[i],
        avatar: `https://i.pravatar.cc/150?img=${i}`,
      };

      this.users.push(user);
      this.filteredUsers.push(user);
    }
  }

  createUser() {
    const newUser: User = {
      id: this.users.length + 1,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      zipcode: faker.address.zipCode(),
      country: faker.address.country(),
      avatar: `https://i.pravatar.cc/150?img=${this.users.length + 1}`,
    };
    this.userService.addNewUser(newUser);
  }

  editUser(userId: number) {
    this.router.navigate(['dashboard/users', userId]);
  }

  search(): void {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm)
    );
  }
}
