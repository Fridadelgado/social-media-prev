import { TestBed } from '@angular/core/testing';

import { StateformService } from './stateform.service';

describe('StateformService', () => {
  let service: StateformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
