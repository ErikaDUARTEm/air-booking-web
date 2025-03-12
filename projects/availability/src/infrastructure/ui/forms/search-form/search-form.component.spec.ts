import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchFormComponent } from './search-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TripOptionsComponent } from '../../components/trip-options/trip-options.component';
import { LocationSelectorComponent } from '../../components/location-selector/location-selector.component';
import { By } from '@angular/platform-browser';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SearchFormComponent,
        TripOptionsComponent,
        LocationSelectorComponent,
      ],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.flightForm).toBeDefined();
    expect(component.flightForm.value).toEqual({
      passengers: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      origin: '',
      destination: '',
      dates: {
        departure: null,
        return: null,
      },
    });
  });

  it('should have required validators', () => {
    const adultsControl = component.flightForm.get('passengers.adults');
    const originControl = component.flightForm.get('origin');
    const departureControl = component.flightForm.get('dates.departure');

    expect(adultsControl?.hasError('required')).toBeFalse();
    adultsControl?.setValue(null);
    expect(adultsControl?.hasError('required')).toBeTrue();

    expect(originControl?.hasError('required')).toBeTrue();
    expect(departureControl?.hasError('required')).toBeTrue();
  });

  it('should update origin value', () => {
    const testOrigin = 'PTY';
    component.updateOrigin(testOrigin);
    expect(component.flightForm.get('origin')?.value).toBe(testOrigin);
  });

  it('should update destination value', () => {
    const testDestination = 'MAD';
    component.updateDestination(testDestination);
    expect(component.flightForm.get('destination')?.value).toBe(
      testDestination
    );
  });

  it('should update dates', () => {
    const testDeparture = new Date('2024-01-15');
    const testReturn = new Date('2024-01-22');

    component.updateDates(testDeparture, testReturn);

    const dates = component.flightForm.get('dates')?.value;
    expect(dates.departure).toEqual(testDeparture);
    expect(dates.return).toEqual(testReturn);
  });

  it('should update passengers', () => {
    component.updatePassengers(2, 1, 1);

    const passengers = component.flightForm.get('passengers')?.value;
    expect(passengers).toEqual({
      adults: 2,
      children: 1,
      infants: 1,
    });
  });

  it('should handle form submission', () => {
    spyOn(console, 'log');
    component.flightForm.patchValue({
      origin: 'PTY',
      destination: 'MAD',
      dates: {
        departure: new Date(),
        return: new Date(),
      },
    });

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);

    expect(console.log).toHaveBeenCalledWith(component.flightForm.value);
  });

  it('should integrate with child components', () => {
    // Test TripOptions integration
    const tripOptions = fixture.debugElement.query(
      By.directive(TripOptionsComponent)
    );
    tripOptions.componentInstance.passengersChange.emit({
      adults: 2,
      children: 1,
      infants: 0,
    });

    expect(component.flightForm.get('passengers')?.value).toEqual({
      adults: 2,
      children: 1,
      infants: 0,
    });

    // Test LocationSelector integration
    const locationSelector = fixture.debugElement.query(
      By.directive(LocationSelectorComponent)
    );
    locationSelector.componentInstance.originChange.emit('PTY');
    locationSelector.componentInstance.destinationChange.emit('MAD');

    expect(component.flightForm.get('origin')?.value).toBe('PTY');
    expect(component.flightForm.get('destination')?.value).toBe('MAD');
  });

  it('should handle partial date updates', () => {
    const initialDeparture = new Date('2024-01-10');
    const initialReturn = new Date('2024-01-20');

    component.flightForm.patchValue({
      dates: {
        departure: initialDeparture,
        return: initialReturn,
      },
    });

    // Update only departure
    const newDeparture = new Date('2024-01-15');
    component.updateDates(newDeparture, initialReturn);
    expect(component.flightForm.get('dates')?.value).toEqual({
      departure: newDeparture,
      return: initialReturn,
    });

    // Update only return
    const newReturn = new Date('2024-01-25');
    component.updateDates(newDeparture, newReturn);
    expect(component.flightForm.get('dates')?.value).toEqual({
      departure: newDeparture,
      return: newReturn,
    });
  });
});
