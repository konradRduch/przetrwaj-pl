import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  private incidentConfirmationMap!: Map<number, Boolean>
  private currentUser: User | undefined;
  private showAddress: boolean = false;
  private userIsModerator: boolean = false;
  private userIsLogged: boolean = false;

  constructor() {
    localStorage.getItem('incidentConfirmationMap') ? this.incidentConfirmationMap = new Map(JSON.parse(localStorage.getItem('incidentConfirmationMap')!)) :
      this.incidentConfirmationMap = new Map<number, Boolean>;
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

  addConfirmation(incidentId: number, isConfirmed: Boolean) {
    this.incidentConfirmationMap.set(incidentId, isConfirmed)
    localStorage.setItem('incidentConfirmationMap', JSON.stringify(Array.from(this.incidentConfirmationMap.entries())));
  }

  getIncidentConfirmationStatus(incidentId: number): Boolean {
    return this.incidentConfirmationMap.has(incidentId) ? this.incidentConfirmationMap.get(incidentId) as Boolean : false;
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
