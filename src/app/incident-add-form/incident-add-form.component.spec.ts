import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentAddFormComponent } from './incident-add-form.component';

describe('IncidentAddFormComponent', () => {
  let component: IncidentAddFormComponent;
  let fixture: ComponentFixture<IncidentAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentAddFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IncidentAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
