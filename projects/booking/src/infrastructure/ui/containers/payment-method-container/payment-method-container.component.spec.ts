import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodContainerComponent } from './payment-method-container.component';

describe('PaymentMethodContainerComponent', () => {
  let component: PaymentMethodContainerComponent;
  let fixture: ComponentFixture<PaymentMethodContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
