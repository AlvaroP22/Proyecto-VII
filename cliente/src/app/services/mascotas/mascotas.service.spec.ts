import { TestBed } from '@angular/core/testing';

import { MascotasService } from '../mascotas/mascotas.service';

describe('MascotasService', () => {
  let service: MascotasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MascotasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
