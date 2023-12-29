import { TestBed } from '@angular/core/testing';

import { DeepcloneService } from './deepclone.service';

describe('DeepcloneService', () => {
  let service: DeepcloneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepcloneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
