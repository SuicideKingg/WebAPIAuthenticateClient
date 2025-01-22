import { TestBed } from '@angular/core/testing';

import { ICrudServiceService } from './icrud-service.service';

describe('ICrudServiceService', () => {
  let service: ICrudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ICrudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
