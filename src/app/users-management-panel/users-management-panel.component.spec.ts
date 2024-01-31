import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagementPanelComponent } from './users-management-panel.component';

describe('UsersManagementPanelComponent', () => {
  let component: UsersManagementPanelComponent;
  let fixture: ComponentFixture<UsersManagementPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersManagementPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersManagementPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
