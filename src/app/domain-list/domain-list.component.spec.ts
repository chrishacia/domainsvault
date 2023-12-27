import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainListComponent } from './domain-list.component';

describe('DomainListComponent', () => {
  let component: DomainListComponent;
  let fixture: ComponentFixture<DomainListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainListComponent]
    });
    fixture = TestBed.createComponent(DomainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
