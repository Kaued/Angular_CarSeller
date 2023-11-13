import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSellerComponent } from './form-seller.component';

describe('FormSellerComponent', () => {
  let component: FormSellerComponent;
  let fixture: ComponentFixture<FormSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSellerComponent]
    });
    fixture = TestBed.createComponent(FormSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
