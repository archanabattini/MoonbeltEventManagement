import { TestBed } from '@angular/core/testing';

import { PartyPersonRelService } from './party-person-rel.service';

describe('PartyPersonRelService', () => {
  let service: PartyPersonRelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyPersonRelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
