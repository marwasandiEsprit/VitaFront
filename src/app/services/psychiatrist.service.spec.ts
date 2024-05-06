import { TestBed } from '@angular/core/testing';

import { PsychiatristService } from './psychiatrist.service';

describe('PsychiatristService', () => {
  let service: PsychiatristService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsychiatristService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
