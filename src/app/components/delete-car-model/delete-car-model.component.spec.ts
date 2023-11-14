import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCarModelComponent } from './delete-car-model.component';

describe('DeleteCarModelComponent', () => {
  let component: DeleteCarModelComponent;
  let fixture: ComponentFixture<DeleteCarModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCarModelComponent]
    });
    fixture = TestBed.createComponent(DeleteCarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
