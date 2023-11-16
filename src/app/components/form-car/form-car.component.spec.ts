import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCarComponent } from './form-car.component';

describe('FormCarComponent', () => {
  let component: FormCarComponent;
  let fixture: ComponentFixture<FormCarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCarComponent]
    });
    fixture = TestBed.createComponent(FormCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
