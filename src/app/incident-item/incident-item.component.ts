import { Component, Input } from '@angular/core';
import { Incident } from '../models/incident';
import { CommonModule } from '@angular/common';
import { GlobalVariablesService } from '../services/global-variables.service';

@Component({
  selector: 'app-incident-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './incident-item.component.html',
  styleUrl: './incident-item.component.css'
})
export class IncidentItemComponent {
  @Input() incident?: Incident;

  constructor(public globalVariablesService: GlobalVariablesService) { }
}
