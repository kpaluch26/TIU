import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNewFormComponent } from './student-new-form.component';

describe('StudentNewFormComponent', () => {
  let component: StudentNewFormComponent;
  let fixture: ComponentFixture<StudentNewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentNewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
