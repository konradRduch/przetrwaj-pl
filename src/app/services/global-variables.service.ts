import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  private currentUser: User | undefined;
  private showAddress: boolean = false;
  private userIsModerator: boolean = false;
  private userIsLogged: boolean = false;

  constructor() {
    localStorage.getItem('currentUser') ? this.currentUser = JSON.parse(localStorage.getItem('currentUser')!) : this.currentUser = undefined;
    localStorage.getItem('userIsModerator') ? this.userIsModerator = JSON.parse(localStorage.getItem('userIsModerator')!) : this.userIsModerator = false;
    localStorage.getItem('userIsLogged') ? this.userIsLogged = JSON.parse(localStorage.getItem('userIsLogged')!) : this.userIsLogged = false;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  setShowAddress(showAddress: boolean) {
    this.showAddress = showAddress;
  }

  setUserIsModerator(isModerator: boolean) {
    this.userIsModerator = isModerator;
    localStorage.setItem('userIsModerator', JSON.stringify(isModerator));
  }

  setUserIsLogged(isLogged: boolean) {
    this.userIsLogged = isLogged;
    localStorage.setItem('userIsLogged', JSON.stringify(isLogged));
  }

  getCurrentUser(): User | undefined {
    return this.currentUser;
  }

  getShowAddress(): boolean {
    return this.showAddress;
  }

  getUserIsModerator(): boolean {
    return this.userIsModerator;
  }

  getUserIsLogged(): boolean {
    return this.userIsLogged;
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
