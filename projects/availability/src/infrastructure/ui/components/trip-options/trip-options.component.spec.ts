import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripOptionsComponent } from './trip-options.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PassengerModalComponent } from '../passenger-modal/passenger-modal.component';

describe('TripOptionsComponent', () => {
  let component: TripOptionsComponent;
  let fixture: ComponentFixture<TripOptionsComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TripOptionsComponent,
        PassengerModalComponent,
      ],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(TripOptionsComponent);
    component = fixture.componentInstance;

    component.formGroup = formBuilder.group({
      tripType: ['roundTrip'],
      passengers: formBuilder.group({
        adults: [1],
        children: [0],
        infants: [0],
      }),
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default passenger values', () => {
    expect(component.numberOfAdults).toBe(1);
    expect(component.numberOfChildren).toBe(0);
    expect(component.numberOfInfants).toBe(0);
    expect(component.passengerCount).toBe(1);
  });

  it('should open passenger modal', () => {
    const button = fixture.debugElement.query(
      By.css('.flight-search__passengers button')
    );
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.showPassengerModal).toBeTrue();
    expect(
      fixture.debugElement.query(By.css('app-passenger-modal'))
    ).toBeTruthy();
  });

  it('should close passenger modal', () => {
    component.showPassengerModal = true;
    fixture.detectChanges();

    const modal = fixture.debugElement.query(
      By.directive(PassengerModalComponent)
    );
    modal.componentInstance.closeModalEvent.emit();

    expect(component.showPassengerModal).toBeFalse();
  });

  it('should update passengers and emit event', () => {
    spyOn(component.passengersChange, 'emit');
    const testPassengers = { adults: 2, children: 1, infants: 1 };

    component.onPassengersSelected(testPassengers);

    expect(component.numberOfAdults).toBe(2);
    expect(component.numberOfChildren).toBe(1);
    expect(component.numberOfInfants).toBe(1);
    expect(component.passengersChange.emit).toHaveBeenCalledWith(
      testPassengers
    );
    expect(component.showPassengerModal).toBeFalse();
  });

  it('should update passenger count', () => {
    component.numberOfAdults = 2;
    component.numberOfChildren = 1;
    component.numberOfInfants = 1;

    expect(component.passengerCount).toBe(4);
  });

  it('should update passengers through individual setters', () => {
    spyOn(component.passengersChange, 'emit');

    component.setAdults(2);
    component.setChildren(1);
    component.setInfants(1);

    expect(component.numberOfAdults).toBe(2);
    expect(component.numberOfChildren).toBe(1);
    expect(component.numberOfInfants).toBe(1);
    expect(component.passengersChange.emit).toHaveBeenCalledTimes(3);
  });

  it('should render passenger summary correctly', () => {
    component.numberOfAdults = 2;
    component.numberOfChildren = 1;
    component.numberOfInfants = 1;
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('.flight-search__passengers button')
    ).nativeElement;
    expect(button.textContent).toContain('2 Adultos');
    expect(button.textContent).toContain('1 Niño');
    expect(button.textContent).toContain('1 Infante');
  });

  it('should handle pluralization correctly', () => {
    component.numberOfAdults = 1;
    component.numberOfChildren = 1;
    component.numberOfInfants = 2;
    fixture.detectChanges();

    const button = fixture.debugElement.query(
      By.css('.flight-search__passengers button')
    ).nativeElement;
    expect(button.textContent).toContain('1 Adulto');
    expect(button.textContent).toContain('1 Niño');
    expect(button.textContent).toContain('2 Infantes');
  });
});
