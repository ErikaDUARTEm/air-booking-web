import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBookingSeatsComponent } from './section-booking-seats.component';

describe('SectionBookingSeatsComponent', () => {
  let component: SectionBookingSeatsComponent;
  let fixture: ComponentFixture<SectionBookingSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionBookingSeatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionBookingSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
