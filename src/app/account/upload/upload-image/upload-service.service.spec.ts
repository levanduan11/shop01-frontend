/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UploadServiceService } from './upload-service.service';

describe('Service: UploadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadServiceService]
    });
  });

  it('should ...', inject([UploadServiceService], (service: UploadServiceService) => {
    expect(service).toBeTruthy();
  }));
});
