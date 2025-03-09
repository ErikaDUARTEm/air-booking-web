import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodOptionsComponent } from './payment-method-options.component';

describe('PaymentMethodOptionsComponent', () => {
  let component: PaymentMethodOptionsComponent;
  let fixture: ComponentFixture<PaymentMethodOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
