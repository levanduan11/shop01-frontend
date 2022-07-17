import { TestBed } from '@angular/core/testing';

import { PasswordInitService } from './password-init.service';

describe('PasswordInitService', () => {
  let service: PasswordInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
