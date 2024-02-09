import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-management-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './users-management-item.component.html',
  styleUrl: './users-management-item.component.css'
})
export class UsersManagementItemComponent {
  @Input() user?: User;

}
