import { Component } from '@angular/core';
import { GlobalVariablesService } from '../services/global-variables.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {

  user: User | undefined;
  tempFirstName: string = "";
  tempLastName: string = "";

  constructor(private globalVariablesService: GlobalVariablesService, private userservice: UsersService, private http: HttpClient) {
    this.user = this.globalVariablesService.getCurrentUser();
  }

  submitForm() {
    this.updateUser(this.tempFirstName, this.tempLastName);
  }

  updateUser(newFirstName?: string, newLastName?: string) {
    const url = `/api/v1/user/byId?id=${this.user?.id}`;

    this.http.patch<any>(url, {
      firstName: newFirstName,
      lastName: newLastName
    }).subscribe(resp => {
      this.user = resp;
      this.globalVariablesService.setCurrentUser(resp);
    });
  }

}
