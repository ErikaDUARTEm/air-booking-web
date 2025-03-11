import { Component, inject } from '@angular/core';
import { PaymentAndSummaryComponentComponent } from '../../components/payment/payment-and-summary-component/payment-and-summary-component.component';
import { PaymentState } from '../../../../domain/state/payment.state';

@Component({
  selector: 'lib-payment-method-container',
  imports: [PaymentAndSummaryComponentComponent],
  templateUrl: './payment-method-container.component.html'
})
export class PaymentMethodContainerComponent {
  private readonly paymentState = inject(PaymentState);

  onMethodSelected(method: 'CARD' | 'PSE' | null): void {
    this.paymentState.updateSelectedMethod(method);
  }

  onFormValidityChange(event: { formType: 'CARD' | 'BILLING' | 'PSE', isValid: boolean, formData: any }): void {
    if (event.isValid) {
      console.log(event.formData, event.isValid)
      if (event.formType === 'CARD' || event.formType === 'PSE') {
        console.log(event.formType)
        this.paymentState.updatePaymentData(event.formData);
      }
      if (event.formType === 'BILLING') {
        console.log(event.formData)
        this.paymentState.updateBillingData(event.formData);
      }
    }
  }

  submitPayment(paymentData: any): void {
    console.log('Datos de pago confirmados:', paymentData);
    //enviar al caso de uso.
  }
}
