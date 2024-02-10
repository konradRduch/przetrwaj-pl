import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariablesService {
  showAddress: boolean = false;
  userIsModerator: boolean = false;

  constructor() { }
}
