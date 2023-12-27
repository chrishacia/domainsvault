import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainStatsComponent } from './domain-stats.component';

describe('DomainStatsComponent', () => {
  let component: DomainStatsComponent;
  let fixture: ComponentFixture<DomainStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainStatsComponent]
    });
    fixture = TestBed.createComponent(DomainStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
