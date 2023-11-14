import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCarModelComponent } from './form-car-model.component';

describe('FormCarModelComponent', () => {
  let component: FormCarModelComponent;
  let fixture: ComponentFixture<FormCarModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCarModelComponent]
    });
    fixture = TestBed.createComponent(FormCarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
