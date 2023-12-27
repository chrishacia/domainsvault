import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProblemComponent } from './report-problem.component';

describe('ReportProblemComponent', () => {
  let component: ReportProblemComponent;
  let fixture: ComponentFixture<ReportProblemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportProblemComponent]
    });
    fixture = TestBed.createComponent(ReportProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
