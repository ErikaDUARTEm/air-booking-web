import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAndSummaryComponentComponent } from './payment-and-summary-component.component';

describe('PaymentAndSummaryComponentComponent', () => {
  let component: PaymentAndSummaryComponentComponent;
  let fixture: ComponentFixture<PaymentAndSummaryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentAndSummaryComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAndSummaryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
