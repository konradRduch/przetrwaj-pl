import { Component, Input } from '@angular/core';
import { ResourcePoint } from '../models/resourcePoint';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resource-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './resource-item.component.html',
  styleUrl: './resource-item.component.css'
})
export class ResourceItemComponent {
  @Input() resourcePoint?: ResourcePoint;
}
