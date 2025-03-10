import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingSeatsBarComponent } from './booking-seats-bar.component';

describe('BookingSeatsBarComponent', () => {
  let component: BookingSeatsBarComponent;
  let fixture: ComponentFixture<BookingSeatsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSeatsBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingSeatsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
