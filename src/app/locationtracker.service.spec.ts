import { TestBed } from '@angular/core/testing';

import { Locationtracker } from './locationtracker.service';

describe('LocationtrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Locationtracker = TestBed.get(Locationtracker);
    expect(service).toBeTruthy();
  });
});
