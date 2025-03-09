import { Component } from '@angular/core';
import { PaymentMethodOptionsComponent } from "../../components/payment-method-options/payment-method-options.component";

@Component({
  selector: 'lib-payment-method-container',
  imports: [PaymentMethodOptionsComponent],
  templateUrl: './payment-method-container.component.html'
})
export class PaymentMethodContainerComponent {

}
