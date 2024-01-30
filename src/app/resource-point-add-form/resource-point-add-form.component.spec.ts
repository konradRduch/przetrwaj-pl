import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePointAddFormComponent } from './resource-point-add-form.component';

describe('ResourcePointAddFormComponent', () => {
  let component: ResourcePointAddFormComponent;
  let fixture: ComponentFixture<ResourcePointAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourcePointAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourcePointAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
