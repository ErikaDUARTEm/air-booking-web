import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingConsultComponent } from './booking-consult.component';

describe('BookingConsultComponent', () => {
  let component: BookingConsultComponent;
  let fixture: ComponentFixture<BookingConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingConsultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
