/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanActivationService } from './can-activation.service';

describe('Service: CanActivation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivationService]
    });
  });

  it('should ...', inject([CanActivationService], (service: CanActivationService) => {
    expect(service).toBeTruthy();
  }));
});
