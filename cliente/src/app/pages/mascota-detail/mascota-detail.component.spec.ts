import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaDetailComponent } from './mascota-detail.component';

describe('MascotaDetailComponent', () => {
  let component: MascotaDetailComponent;
  let fixture: ComponentFixture<MascotaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
