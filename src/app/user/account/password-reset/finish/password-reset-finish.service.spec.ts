import { TestBed } from '@angular/core/testing';

import { PasswordResetFinishService } from './password-reset-finish.service';

describe('PasswordResetFinishService', () => {
  let service: PasswordResetFinishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetFinishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
