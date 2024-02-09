import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagementItemComponent } from './users-management-item.component';

describe('UsersManagementItemComponent', () => {
  let component: UsersManagementItemComponent;
  let fixture: ComponentFixture<UsersManagementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersManagementItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersManagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
