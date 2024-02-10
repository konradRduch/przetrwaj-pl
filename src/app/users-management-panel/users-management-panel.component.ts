import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { UsersManagementItemComponent } from '../users-management-item/users-management-item.component';

@Component({
  selector: 'app-users-management-panel',
  standalone: true,
  imports: [
    CommonModule,
    UsersManagementItemComponent
  ],
  templateUrl: './users-management-panel.component.html',
  styleUrl: './users-management-panel.component.css'
})
export class UsersManagementPanelComponent {
  users: User[] = [];

  constructor(private usersService: UsersService) {
    this.usersService.fetchUsers();
    this.usersService.getUsers().subscribe(users => {
      this.users = users.filter(user => user.role !== 'ADMIN');
    });
  }
}
