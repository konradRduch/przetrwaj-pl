import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users: User[] = [];
  users = new BehaviorSubject<User[]>(this._users);

  constructor(private http: HttpClient) {
    this.fetchUsers();
  }

  fetchUsers() {
    // fetch users from the db

    // test data
    this._users = [
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'u1@e.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'u2@e.com' }
    ];
    this.users.next(this._users);
  }

  getUsers() {
    return this.users.asObservable();
  }
}
