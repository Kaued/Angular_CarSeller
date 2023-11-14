import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBrandComponent } from './info-brand.component';

describe('InfoBrandComponent', () => {
  let component: InfoBrandComponent;
  let fixture: ComponentFixture<InfoBrandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoBrandComponent]
    });
    fixture = TestBed.createComponent(InfoBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
