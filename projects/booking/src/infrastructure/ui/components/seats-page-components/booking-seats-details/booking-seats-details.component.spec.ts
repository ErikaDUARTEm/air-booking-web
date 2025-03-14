import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingSeatsDetailsComponent } from './booking-seats-details.component';
import { By } from '@angular/platform-browser';

describe('BookingSeatsDetailsComponent', () => {
  let component: BookingSeatsDetailsComponent;
  let fixture: ComponentFixture<BookingSeatsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSeatsDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSeatsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the flight title and duration', () => {
    const flightTitle = fixture.debugElement.query(By.css('.seats-details__flight-title')).nativeElement;
    const flightDuration = fixture.debugElement.query(By.css('.seats-details__flight-duration')).nativeElement;

    expect(flightTitle.textContent).toContain('Vuelo CM 495 - 737-700 B');
    expect(flightDuration.textContent).toContain('Duración de vuelo: 16h 42m');
  });

  it('should display all seat prices correctly', () => {
    const seatPrices = fixture.debugElement.queryAll(By.css('.seats-details__seat-price'));
    expect(seatPrices.length).toBe(5);

    const priceLabels = seatPrices.map(seat => 
      seat.query(By.css('.seats-details__price-label'))?.nativeElement.textContent.trim()
    );

    expect(priceLabels).toEqual([
      'Desde 174.540 COP',
      'Desde 95.590 COP',
      'Desde 136.220 COP',
      'Gratis',
      undefined 
    ]);
  });

  it('should display seat types correctly', () => {
    const seatTypes = fixture.debugElement.queryAll(By.css('.seats-details__price-type')).map(type =>
      type.nativeElement.textContent.trim()
    );

    expect(seatTypes).toEqual([
      'Favorable',
      'Salida de Emergencia',
      'Regular',
      'No disponible'
    ]);
  });

  it('should display info about PreferMembers', () => {
    const infoText = fixture.debugElement.query(By.css('.seats-details__info p')).nativeElement.textContent.trim();
    expect(infoText).toBe('Los PreferMembers de ConnectMiles disfrutan de preselección de asientos de forma gratuita');
  });
});
