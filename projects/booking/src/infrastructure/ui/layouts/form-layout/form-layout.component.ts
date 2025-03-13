import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DetailsContainerComponent } from '../../containers/details-container/details-container.component';
import { HeaderPaymentComponent } from "../../components/payment/header-payment/header-payment.component";

@Component({
  selector: 'lib-form-layout',
  imports: [RouterOutlet, DetailsContainerComponent, HeaderPaymentComponent],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.scss'
})
export class FormLayoutComponent {

}
