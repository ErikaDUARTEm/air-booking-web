import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassengerModalComponent } from './passenger-modal.component';
import { By } from '@angular/platform-browser';

describe('PassengerModalComponent', () => {
  let component: PassengerModalComponent;
  let fixture: ComponentFixture<PassengerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PassengerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial passenger counts', () => {
    component.adults = 2;
    component.children = 1;
    component.infants = 1;
    fixture.detectChanges();

    const counts = fixture.debugElement.queryAll(
      By.css('.passenger-modal__count')
    );
    expect(counts[0].nativeElement.textContent.trim()).toBe('2');
    expect(counts[1].nativeElement.textContent.trim()).toBe('1');
    expect(counts[2].nativeElement.textContent.trim()).toBe('1');
  });

  it('should increment adults', () => {
    const button = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[1];
    button.triggerEventHandler('click', null);
    expect(component.adults).toBe(2);
  });

  it('should prevent adults from going below 1', () => {
    const button = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[0];
    button.triggerEventHandler('click', null);
    expect(component.adults).toBe(1);
  });

  it('should increment children', () => {
    const button = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[3];
    button.triggerEventHandler('click', null);
    expect(component.children).toBe(1);
  });

  it('should decrement children', () => {
    component.children = 1;
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[2];
    button.triggerEventHandler('click', null);
    expect(component.children).toBe(0);
  });

  it('should increment infants', () => {
    const button = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[5];
    button.triggerEventHandler('click', null);
    expect(component.infants).toBe(1);
  });

  it('should emit passengers on save', () => {
    spyOn(component.passengersSelected, 'emit');
    component.adults = 2;
    component.children = 1;

    const saveButton = fixture.debugElement.query(
      By.css('.passenger-modal__button-save')
    );
    saveButton.triggerEventHandler('click', null);

    expect(component.passengersSelected.emit).toHaveBeenCalledWith({
      adults: 2,
      children: 1,
      infants: 0,
    });
  });

  it('should emit close event', () => {
    spyOn(component.closeModalEvent, 'emit');
    component.closeModal();
    expect(component.closeModalEvent.emit).toHaveBeenCalled();
  });

  it('should handle minimum values', () => {
    component.adults = 1;
    component.children = 0;
    component.infants = 0;

    const decrementButtons = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    );
    decrementButtons[0].triggerEventHandler('click', null);
    decrementButtons[2].triggerEventHandler('click', null);
    decrementButtons[4].triggerEventHandler('click', null);

    expect(component.adults).toBe(1);
    expect(component.children).toBe(0);
    expect(component.infants).toBe(0);
  });

  it('should decrement adults when count is greater than 1', () => {
    component.adults = 3;
    const button = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[0];
    button.triggerEventHandler('click', null);
    expect(component.adults).toBe(2);
  });

  it('should not decrement children when count is 0', () => {
    component.children = 0;
    const button = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[2];
    button.triggerEventHandler('click', null);
    expect(component.children).toBe(0);
  });

  it('should not decrement infants when count is 0', () => {
    component.infants = 0;
    const button = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[4];
    button.triggerEventHandler('click', null);
    expect(component.infants).toBe(0);
  });

  it('should call closeModal after save', () => {
    spyOn(component, 'closeModal');
    component.save();
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should close modal when clicking close button', () => {
    spyOn(component.closeModalEvent, 'emit');
    const closeButton = fixture.debugElement.query(
      By.css('.passenger-modal__button-close')
    );
    closeButton.triggerEventHandler('click', null);
    expect(component.closeModalEvent.emit).toHaveBeenCalled();
  });

  it('should update infant count through UI', () => {
    const incrementButton = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[5];
    const decrementButton = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    )[4];

    incrementButton.triggerEventHandler('click', null);
    expect(component.infants).toBe(1);

    decrementButton.triggerEventHandler('click', null);
    expect(component.infants).toBe(0);
  });

  it('should handle maximum values', () => {
    component.adults = 9;
    component.children = 9;
    component.infants = 9;

    const incrementButtons = fixture.debugElement.queryAll(
      By.css('.passenger-modal__row-button')
    );
    incrementButtons[1].triggerEventHandler('click', null);
    incrementButtons[3].triggerEventHandler('click', null);
    incrementButtons[5].triggerEventHandler('click', null);

    expect(component.adults).toBe(10);
    expect(component.children).toBe(10);
    expect(component.infants).toBe(10);
  });
});
