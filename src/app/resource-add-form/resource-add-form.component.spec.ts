import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAddFormComponent } from './resource-add-form.component';

describe('ResourceAddFormComponent', () => {
  let component: ResourceAddFormComponent;
  let fixture: ComponentFixture<ResourceAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
