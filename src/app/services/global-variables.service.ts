import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  //aktualnie zalogowany uzytkownik
  currentId: String ="";
  currentFirstName: String = "";
  currentLastName: String = "";

  currentUser: User | undefined;
  showAddress: boolean = false;
  userIsModerator: boolean = false;

    id: number ;
    firstName: string="";
    lastName: string="";
    email: string="";
    role: string="";

    nameChange: Subject<string> = new Subject<string>();
    nameChange2: Subject<string> = new Subject<string>();
  constructor() {this.id = 0;  }

  getUser(): User {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role
    };
  }

  updateFirstName(firstName: string) {
    this.firstName = firstName;
    this.nameChange.next(firstName);
  }

  updateLastName(lastName: string) {
    this.lastName = lastName;
    this.nameChange2.next(lastName);
  }

}
