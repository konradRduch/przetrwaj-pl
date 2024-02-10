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
    this.http.get<User[]>('/api/v1/user').subscribe(users => {
      this._users = users;
      this.users.next(this._users);
    });
  }

  getUsers() {
    return this.users.asObservable();
  }
}
