import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalendarComponent } from './calendar.component';
import { DatePipe } from '@angular/common';
import { DebugElement, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  const mockDate = new Date('2024-01-15T00:00:00');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'es' }],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    component.currentMonth = new Date(mockDate);
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar la estructura básica correctamente', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const monthLabel = fixture.debugElement.query(
      By.css('.calendar__header span')
    ).nativeElement;

    expect(buttons[0].nativeElement.textContent.trim()).toBe('◀');
    expect(buttons[1].nativeElement.textContent.trim()).toBe('▶');

    expect(monthLabel.textContent.trim().toLowerCase()).toBe('enero 2024');
  });

  it('debería cambiar de mes al hacer clic en los botones', () => {
    const prevButton = fixture.debugElement.queryAll(By.css('button'))[0];
    const nextButton = fixture.debugElement.queryAll(By.css('button'))[1];

    prevButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.currentMonth.getMonth()).toBe(11);

    nextButton.nativeElement.click();
    nextButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.currentMonth.getMonth()).toBe(1);
  });

  const findDateElement = (day: number): DebugElement | undefined => {
    return fixture.debugElement
      .queryAll(By.css('.calendar__weeks div'))
      .find((d) => {
        const isCurrentMonth = d.classes['calendar__day--current'];
        const dateNumber = parseInt(d.nativeElement.textContent.trim(), 10);
        return isCurrentMonth && dateNumber === day;
      });
  };

  it('debería manejar correctamente la selección de fechas', () => {
    const dateSpy = spyOn(component.dateSelected, 'emit');

    const dia15 = findDateElement(15);
    dia15?.nativeElement.click();

    const dia20 = findDateElement(20);
    dia20?.nativeElement.click();

    expect(component.selectedDepartureDate?.getDate()).toBe(15);
    expect(component.selectedReturnDate?.getDate()).toBe(20);
    expect(dateSpy).toHaveBeenCalledTimes(2);
  });

  it('debería invertir fechas si se selecciona regreso antes que ida', () => {
    const dia20 = findDateElement(20);
    const dia15 = findDateElement(15);

    dia20?.nativeElement.click();
    dia15?.nativeElement.click();

    expect(component.selectedDepartureDate?.getDate()).toBe(15);
    expect(component.selectedReturnDate?.getDate()).toBe(20);
  });

  it('debería aplicar clases CSS correctamente', () => {
    const dia15 = findDateElement(15);
    const dia20 = findDateElement(20);

    dia15?.nativeElement.click();
    dia20?.nativeElement.click();

    fixture.detectChanges();

    expect(dia15?.classes['calendar__day--selected']).toBeTrue();
    expect(dia20?.classes['calendar__day--selected']).toBeTrue();

    for (let day = 16; day < 20; day++) {
      const dateElement = findDateElement(day);
      expect(dateElement?.classes['calendar__day--between']).toBeTrue();
    }
  });
});
