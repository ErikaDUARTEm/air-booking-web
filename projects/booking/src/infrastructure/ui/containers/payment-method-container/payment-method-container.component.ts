import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { PaymentAndSummaryComponentComponent } from '../../components/payment/payment-and-summary-component/payment-and-summary-component.component';
import { PaymentState } from '../../../../domain/state/payment.state';
import { PaymentUseCase } from '../../../../application/booking/payment.usecase';
import { IPaymentData } from '../../../../domain/model/payment.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'lib-payment-method-container',
  imports: [PaymentAndSummaryComponentComponent, AsyncPipe],
  templateUrl: './payment-method-container.component.html',
})
export class PaymentMethodContainerComponent implements OnInit {
  private readonly paymentState = inject(PaymentState);
  private readonly _paymentUseCase = inject(PaymentUseCase);
  public paymentData$!: Observable<IPaymentData>;
  public successMessage$!: Observable<string>;


  ngOnInit() {
    this.paymentData$ = this._paymentUseCase.paymentData$();
    this.successMessage$ = this.paymentState.store().successMessage.$();
  }

  onMethodSelected(method: 'CARD' | 'PSE' | null): void {
    this.paymentState.updateSelectedMethod(method);
  }

  onFormValidityChange(event: {
    formType: 'CARD' | 'BILLING' | 'PSE';
    isValid: boolean;
    formData: any;
  }): void {
    if (event.isValid) {
      if (event.formType === 'CARD' || event.formType === 'PSE') {
        this.paymentState.updatePaymentData(event.formData);
      }
      if (event.formType === 'BILLING') {
        this.paymentState.updateBillingData(event.formData);
      }
    }
  }
  submitPayment(paymentData: any): void {
    this._paymentUseCase.execute(paymentData);

  }
}
