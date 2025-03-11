import { Component, output } from '@angular/core';
import { PaymentMethodOptionsComponent } from '../payment-method-options/payment-method-options.component';
import { HeaderPaymentComponent } from '../header-payment/header-payment.component';
@Component({
  selector: 'lib-payment-and-summary-component',
  imports: [PaymentMethodOptionsComponent, HeaderPaymentComponent],
  templateUrl: './payment-and-summary-component.component.html',
  styleUrl: './payment-and-summary-component.component.scss'
})
export class PaymentAndSummaryComponentComponent {

  public onConfirmPayment = output<any>();

  handleConfirmPayment(paymentData: any): void {
    this.onConfirmPayment.emit(paymentData);
    console.log('Datos confirmados emitidos al contenedor:', paymentData);
  }
}
