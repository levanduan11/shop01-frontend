/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductRoutingResolveService } from './product-routing-resolve.service';

describe('Service: ProductRoutingResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductRoutingResolveService]
    });
  });

  it('should ...', inject([ProductRoutingResolveService], (service: ProductRoutingResolveService) => {
    expect(service).toBeTruthy();
  }));
});
