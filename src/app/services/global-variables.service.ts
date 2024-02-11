import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  currentUser: User | undefined;
  showAddress: boolean = false;
  userIsModerator: boolean = false;

  constructor() { }
}
