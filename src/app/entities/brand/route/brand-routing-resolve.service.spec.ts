/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrandRoutingResolveService } from './brand-routing-resolve.service';

describe('Service: BrandRoutingResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandRoutingResolveService]
    });
  });

  it('should ...', inject([BrandRoutingResolveService], (service: BrandRoutingResolveService) => {
    expect(service).toBeTruthy();
  }));
});
