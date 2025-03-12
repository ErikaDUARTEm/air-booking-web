import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingNevbarComponent } from './booking-navbar.component';

describe('BookingNevbarComponent', () => {
  let component: BookingNevbarComponent;
  let fixture: ComponentFixture<BookingNevbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingNevbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingNevbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
