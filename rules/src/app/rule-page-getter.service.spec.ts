import { TestBed } from '@angular/core/testing';

import { RulePageGetterService } from './rule-page-getter.service';

describe('RulePageGetterService', () => {
  let service: RulePageGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulePageGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
