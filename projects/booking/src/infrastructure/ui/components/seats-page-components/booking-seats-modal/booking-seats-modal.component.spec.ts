import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingSeatsModalComponent } from './booking-seats-modal.component';
import { By } from '@angular/platform-browser';

describe('BookingSeatsModalComponent', () => {
  let component: BookingSeatsModalComponent;
  let fixture: ComponentFixture<BookingSeatsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingSeatsModalComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSeatsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the seat info correctly', () => {
    component.seatInfo = '10B';
    fixture.detectChanges();

    const seatText = fixture.debugElement.query(By.css('.warning-text')).nativeElement.textContent;
    expect(seatText).toContain('Has seleccionado el asiento 10B');
  });

  it('should emit confirm event when confirm button is clicked', () => {
    spyOn(component.confirm, 'emit');

    const confirmButton = fixture.debugElement.query(By.css('.btn-confirm')).nativeElement;
    confirmButton.click();

    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('should emit cancel event when cancel button is clicked', () => {
    spyOn(component.cancel, 'emit');

    const cancelButton = fixture.debugElement.query(By.css('.btn-cancel')).nativeElement;
    cancelButton.click();

    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should emit close event when close button is clicked', () => {
    spyOn(component.close, 'emit');

    const closeButton = fixture.debugElement.query(By.css('.close-button')).nativeElement;
    closeButton.click();

    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should display the modal only when isOpen is true', () => {
    component.isOpen = true;
    fixture.detectChanges();

    let modal = fixture.debugElement.query(By.css('.modal-overlay'));
    expect(modal).toBeTruthy();

    component.isOpen = false;
    fixture.detectChanges();

    modal = fixture.debugElement.query(By.css('.modal-overlay'));
    expect(modal).toBeFalsy();
  });

  
});
