import { Component, inject, output} from '@angular/core';
import { CreditCardFormComponentComponent } from '../../forms/credit-card-form-component/credit-card-form-component.component';
import { PseFormComponentComponent } from "../../forms/pse-form-component/pse-form-component.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BillingFormComponent } from '../../forms/billing-form/billing-form.component';



@Component({
  selector: 'lib-payment-method-options',
  imports: [CreditCardFormComponentComponent, PseFormComponentComponent, CommonModule, ReactiveFormsModule, BillingFormComponent],
  templateUrl: './payment-method-options.component.html',
  styleUrl: './payment-method-options.component.scss'
})
export class PaymentMethodOptionsComponent {

  public onMethodSelected = output<'CARD' | 'PSE' | null>();
  public onConfirmPayment = output<any>();

  selectedMethod: 'CARD' | 'PSE' | null = null;

  formStates = {
    CARD: { isValid: false, formData: null },
    PSE: { isValid: false, formData: null },
    BILLING: { isValid: false, formData: null },
  };

  handleSelectMethod(method: 'CARD' | 'PSE' | null): void {
    console.log('Selected method:', this.selectedMethod);

    this.selectedMethod = method;
    this.onMethodSelected.emit(method);
  }

  handleFormValidity(formType: 'CARD' | 'BILLING' | 'PSE', isValid: boolean, formData: any): void {
    console.log(`Formulario actualizado: ${formType}, Válido: ${isValid}`);
    this.formStates[formType] = { isValid, formData };
  }

  isConfirmButtonEnabled(): boolean {
    if (this.selectedMethod === 'CARD') {
      return this.formStates.CARD.isValid && this.formStates.BILLING.isValid;
    } else if (this.selectedMethod === 'PSE') {
      return this.formStates.PSE.isValid && this.formStates.BILLING.isValid;
    }
    return false;
  }

  confirmPayment(): void {
    const paymentData = {
      method: this.selectedMethod,
      cardData: this.formStates.CARD.formData,
      pseData: this.formStates.PSE.formData,
      billingData: this.formStates.BILLING.formData,
    };
    this.onConfirmPayment.emit(paymentData);
    console.log('Pago confirmado', paymentData);
  }
}
