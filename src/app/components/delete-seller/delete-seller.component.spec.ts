import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSellerComponent } from './delete-seller.component';

describe('DeleteSellerComponent', () => {
  let component: DeleteSellerComponent;
  let fixture: ComponentFixture<DeleteSellerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSellerComponent]
    });
    fixture = TestBed.createComponent(DeleteSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
