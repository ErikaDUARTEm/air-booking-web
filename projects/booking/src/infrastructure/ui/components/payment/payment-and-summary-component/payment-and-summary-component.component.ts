import { Component,  inject,  input,  output } from '@angular/core';
import { PaymentMethodOptionsComponent } from '../payment-method-options/payment-method-options.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'lib-payment-and-summary-component',
  imports: [PaymentMethodOptionsComponent, CommonModule],
  templateUrl: './payment-and-summary-component.component.html',
  styleUrl: './payment-and-summary-component.component.scss'
})
export class PaymentAndSummaryComponentComponent {

  public onConfirmPayment = output<any>();
  public successMessage$ = input<string>();

  handleConfirmPaymentAndRedirectToHome(paymentData: any): void {
    this.onConfirmPayment.emit(paymentData);


  }
}
