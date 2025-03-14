import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingNavbarComponent } from './booking-navbar.component';
import { By } from '@angular/platform-browser';

describe('BookingNavbarComponent', () => {
  let component: BookingNavbarComponent;
  let fixture: ComponentFixture<BookingNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingNavbarComponent], // 🔥 Importar en lugar de declarar
    }).compileComponents();

    fixture = TestBed.createComponent(BookingNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the flight info correctly', () => {
    const flightInfo = fixture.debugElement.query(By.css('.navbar__flight-info'));
    expect(flightInfo.nativeElement.textContent).toContain('Vuelo 1 de 2');
    expect(flightInfo.nativeElement.textContent).toContain('hacia PTY');
  });

  it('should have "Vuelo Anterior" button text', () => {
    const previousButton = fixture.debugElement.query(By.css('.navbar__nav-button--left .navbar__button-text'));
    expect(previousButton.nativeElement.textContent).toBe('Vuelo Anterior');
  });

  it('should have "Siguiente Vuelo" button text', () => {
    const nextButton = fixture.debugElement.query(By.css('.navbar__nav-button--right .navbar__button-text'));
    expect(nextButton.nativeElement.textContent).toBe('Siguiente Vuelo');
  });

  it('should display the seat map correctly', () => {
    const seats = fixture.debugElement.queryAll(By.css('.navbar__seat'));
    const seatValues = seats.map(seat => seat.nativeElement.textContent.trim());
    expect(seatValues).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
  });
});
