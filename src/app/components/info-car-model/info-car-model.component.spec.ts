import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCarModelComponent } from './info-car-model.component';

describe('InfoCarModelComponent', () => {
  let component: InfoCarModelComponent;
  let fixture: ComponentFixture<InfoCarModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoCarModelComponent]
    });
    fixture = TestBed.createComponent(InfoCarModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
