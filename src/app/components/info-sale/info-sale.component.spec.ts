import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSaleComponent } from './info-sale.component';

describe('InfoSaleComponent', () => {
  let component: InfoSaleComponent;
  let fixture: ComponentFixture<InfoSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoSaleComponent]
    });
    fixture = TestBed.createComponent(InfoSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
