import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalendarModalComponent } from './calendar-modal.component';
import { CalendarComponent } from '../calendar/calendar.component';

describe('CalendarModalComponent', () => {
  let component: CalendarModalComponent;
  let fixture: ComponentFixture<CalendarModalComponent>;
  const mockDate = new Date('2025-05-01');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar la estructura básica correctamente', () => {
    const title = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(title.textContent).toContain('Selecciona las fechas');

    const calendar = fixture.debugElement.query(
      By.directive(CalendarComponent)
    );
    expect(calendar).toBeTruthy();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const closeButton = buttons.find((b) =>
      b.nativeElement.textContent.includes('Cerrar')
    );

    expect(closeButton).toBeTruthy();
    expect(closeButton?.nativeElement.textContent.trim()).toBe('Cerrar');
  });

  it('debería emitir fechas y cerrar al completar selección', () => {
    const emitSpy = spyOn(component.datesSelected, 'emit');
    const closeSpy = spyOn(component, 'closeModal');

    component.onDateSelected(mockDate);
    expect(component.selectedDepartureDate).toEqual(mockDate);

    const returnDate = new Date('2025-05-10');
    component.onDateSelected(returnDate);

    expect(component.selectedReturnDate).toEqual(returnDate);
    expect(emitSpy).toHaveBeenCalledWith({
      departure: mockDate,
      return: returnDate,
    });
    expect(closeSpy).toHaveBeenCalled();
  });

  it('debería emitir evento al cerrar', () => {
    const emitSpy = spyOn(component.closeModalEvent, 'emit');

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const closeButton = buttons.find((b) =>
      b.nativeElement.textContent.includes('Cerrar')
    );

    closeButton?.nativeElement.click();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('debería reiniciar selección si regreso es anterior a ida', () => {
    const returnDate = new Date('2025-05-01');
    const departureDate = new Date('2025-05-10');

    component.onDateSelected(returnDate);
    component.onDateSelected(departureDate);

    expect(component.selectedDepartureDate).toEqual(returnDate);
    expect(component.selectedReturnDate).toEqual(departureDate);
  });

  it('debería limpiar fechas correctamente', () => {
    component.selectedDepartureDate = mockDate;
    component.selectedReturnDate = mockDate;

    component.onClearDates();

    expect(component.selectedDepartureDate).toBeNull();
    expect(component.selectedReturnDate).toBeNull();
  });

  it('debería emitir al confirmar manualmente', () => {
    const emitSpy = spyOn(component.datesSelected, 'emit');
    const closeSpy = spyOn(component, 'closeModal');

    const mockDates = {
      departure: mockDate,
      return: new Date('2025-05-10'),
    };

    component.onConfirmDates(mockDates);

    expect(emitSpy).toHaveBeenCalledWith(mockDates);
    expect(closeSpy).toHaveBeenCalled();
  });
});
