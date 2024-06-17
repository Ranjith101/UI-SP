// user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from './../../user.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('User deleted successfully.');
        this.loadUsers(); // Reload users after deletion
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
