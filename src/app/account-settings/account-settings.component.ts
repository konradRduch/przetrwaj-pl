import { Component } from '@angular/core';
import { GlobalVariablesService } from '../services/global-variables.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent {

  id: Number | undefined;
  firstName: String = "";
  lastName: String = "";
  tempFirstName: string= "";
  tempLastName: string= "";
  constructor(private globalservice: GlobalVariablesService, private userservice: UsersService){
    this.firstName=globalservice.firstName;
    this.lastName =globalservice.lastName;
  }
  submitForm() {
    
    this.globalservice.updateFirstName(this.tempFirstName);
    this.globalservice.updateLastName(this.tempLastName);

    this.globalservice.nameChange.subscribe((value) => { 
      this.firstName = value; 
    });

    this.globalservice.nameChange2.subscribe((value) => { 
      this.lastName = value; 
    });

    this.userservice.updateUser();

  }
  

}
