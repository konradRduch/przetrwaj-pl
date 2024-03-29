import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { GlobalVariablesService } from './global-variables.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users: User[] = [];
  users = new BehaviorSubject<User[]>(this._users);

  constructor(private http: HttpClient, private global: GlobalVariablesService) {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<User[]>('/api/v1/user').subscribe(users => {
      this._users = users;
      this.users.next(this._users);
    });
  }

  getUsers() {
    return this.users.asObservable();
  }

  deleteUser(user: User) {
    this.http.delete('/api/v1/user/byId?id=' + user.id, { responseType: 'text' }).subscribe(resp => {
      this.fetchUsers();
    });
  }
}
