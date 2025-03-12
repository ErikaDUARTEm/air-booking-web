import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSeatsModalComponent } from './booking-seats-modal.component';

describe('BookingSeatsModalComponent', () => {
  let component: BookingSeatsModalComponent;
  let fixture: ComponentFixture<BookingSeatsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSeatsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingSeatsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
