import { TestBed, inject } from '@angular/core/testing';

import { AlertInformService } from './alert-inform.service';

describe('AlertInformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertInformService]
    });
  });

  it('should be created', inject([AlertInformService], (service: AlertInformService) => {
    expect(service).toBeTruthy();
  }));
});
