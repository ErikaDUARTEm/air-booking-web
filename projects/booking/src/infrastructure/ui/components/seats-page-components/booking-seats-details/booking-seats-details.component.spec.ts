import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSeatsDetailsComponent } from './booking-seats-details.component';

describe('BookingSeatsDetailsComponent', () => {
  let component: BookingSeatsDetailsComponent;
  let fixture: ComponentFixture<BookingSeatsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSeatsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingSeatsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
