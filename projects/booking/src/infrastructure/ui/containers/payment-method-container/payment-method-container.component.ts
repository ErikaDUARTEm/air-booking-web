import { Component } from '@angular/core';
import { PaymentAndSummaryComponentComponent } from '../../components/payment-and-summary-component/payment-and-summary-component.component';

@Component({
  selector: 'lib-payment-method-container',
  imports: [PaymentAndSummaryComponentComponent],
  templateUrl: './payment-method-container.component.html'
})
export class PaymentMethodContainerComponent {

}
