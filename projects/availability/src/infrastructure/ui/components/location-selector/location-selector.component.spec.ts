import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { LocationSelectorComponent } from './location-selector.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { DatePipe } from '@angular/common';

describe('LocationSelectorComponent', () => {
  let component: LocationSelectorComponent;
  let fixture: ComponentFixture<LocationSelectorComponent>;
  const formBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        LocationSelectorComponent,
        CalendarModalComponent,
      ],
      providers: [DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationSelectorComponent);
    component = fixture.componentInstance;

    component.formGroup = formBuilder.group({
      origin: ['PTY'],
      destination: ['MAD'],
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind form controls correctly', () => {
    const originInput = fixture.debugElement.query(
      By.css('[formControlName="origin"]')
    );
    const destinationInput = fixture.debugElement.query(
      By.css('[formControlName="destination"]')
    );

    expect(originInput.nativeElement.value).toBe('PTY');
    expect(destinationInput.nativeElement.value).toBe('MAD');
  });

  it('should swap locations and emit events', () => {
    spyOn(component.originChange, 'emit');
    spyOn(component.destinationChange, 'emit');

    component.formGroup.setValue({
      origin: 'PTY',
      destination: 'MAD',
    });

    const swapButton = fixture.debugElement.query(
      By.css('.flight-search__swap')
    );
    swapButton.nativeElement.click();
    fixture.detectChanges();

    expect(component.originChange.emit).toHaveBeenCalledWith('MAD');
    expect(component.destinationChange.emit).toHaveBeenCalledWith('PTY');

    expect(component.formGroup.value).toEqual({
      origin: 'MAD',
      destination: 'PTY',
    });
  });

  it('should open calendar modal on focus', () => {
    const dateInput = fixture.debugElement.query(
      By.css('.flight-search__field-input[readonly]')
    );
    dateInput.triggerEventHandler('focus', null);

    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('app-calendar-modal'));
    expect(modal).toBeTruthy();
  });

  it('should handle date selection and format dates', fakeAsync(() => {
    const testDates = {
      departure: new Date('2024-01-15T00:00:00'),
      return: new Date('2024-01-22T00:00:00'),
    };

    spyOn(component.departureDateChange, 'emit');
    spyOn(component.returnDateChange, 'emit');

    component.onDatesSelected(testDates);
    tick();
    fixture.detectChanges();

    expect(component.selectedDates).toMatch(
      /(lun|dom|Mon|Sun),?\s\d{1,2}\s(ene|jan)/i
    );

    expect(component.departureDateChange.emit).toHaveBeenCalledWith(
      testDates.departure
    );
    expect(component.returnDateChange.emit).toHaveBeenCalledWith(
      testDates.return
    );
  }));

  it('should close calendar modal', () => {
    component.showCalendarModal = true;
    fixture.detectChanges();

    const modal = fixture.debugElement.query(
      By.directive(CalendarModalComponent)
    );
    modal.componentInstance.closeModalEvent.emit();

    expect(component.showCalendarModal).toBeFalse();
  });

  it('should render all critical UI elements', () => {
    expect(fixture.debugElement.query(By.css('svg'))).toBeTruthy();
    expect(
      fixture.debugElement.query(By.css('button[type="submit"]'))
    ).toBeTruthy();
    expect(
      fixture.debugElement.queryAll(By.css('.flight-search__field-input'))
        .length
    ).toBe(3);
  });
});
