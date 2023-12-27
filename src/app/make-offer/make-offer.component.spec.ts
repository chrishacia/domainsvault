import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeOfferComponent } from './make-offer.component';

describe('MakeOfferComponent', () => {
  let component: MakeOfferComponent;
  let fixture: ComponentFixture<MakeOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeOfferComponent]
    });
    fixture = TestBed.createComponent(MakeOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
