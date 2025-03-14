import { Component, inject, input, output, ViewChild} from '@angular/core';
import { CreditCardFormComponentComponent } from '../../../forms/forms-method-payment/credit-card-form-component/credit-card-form-component.component';
import { PseFormComponentComponent } from "../../../forms/forms-method-payment/pse-form-component/pse-form-component.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BillingFormComponent } from '../../../forms/forms-method-payment/billing-form/billing-form.component';
import { PaymentState } from '../../../../../domain/state/payment.state';
import { IBillingAddress, ICard, IPaymentData, IPse } from '../../../../../domain/model/payment.model';



@Component({
  selector: 'lib-payment-method-options',
  imports: [CreditCardFormComponentComponent, PseFormComponentComponent, CommonModule, ReactiveFormsModule, BillingFormComponent],
  templateUrl: './payment-method-options.component.html',
  styleUrl: './payment-method-options.component.scss'
})
export class PaymentMethodOptionsComponent {

  @ViewChild(CreditCardFormComponentComponent, { static: false }) creditCardFormComponent!: CreditCardFormComponentComponent;
  @ViewChild(PseFormComponentComponent, { static: false }) pseFormComponent!: PseFormComponentComponent;
  @ViewChild(BillingFormComponent, { static: false }) billingFormComponent!: BillingFormComponent;
  private readonly paymentState = inject(PaymentState);
  public onMethodSelected = output<'CARD' | 'PSE' | null>();
  public onConfirmPayment = output<any>();
  public successMessage$ = input<string  | null>();

  selectedMethod: 'CARD' | 'PSE' | null = null;

  formStates = {
    CARD: { isValid: false, formData: null },
    PSE: { isValid: false, formData: null },
    BILLING: { isValid: false, formData: null },
  };
  message(): string {
    return this.paymentState.store().successMessage.snapshot();
  }
  handleSelectMethod(method: 'CARD' | 'PSE' | null): void {
    this.selectedMethod = method;
    const componentsToReset = {
      default: [this.creditCardFormComponent, this.pseFormComponent, this.billingFormComponent],
      CARD: [this.pseFormComponent, this.billingFormComponent],
      PSE: [this.creditCardFormComponent, this.billingFormComponent]
    };

    const key = method === null ? 'default' : method;

    (componentsToReset[key] || []).forEach((component, index) => {
      if (component && component.resetForm) {
        component.resetForm();
      } else {
        console.warn(`Componente no inicializado en posición ${index}`);
      }
    });
    this.onMethodSelected.emit(method);
  }


  handleFormValidity(formType: 'CARD' | 'BILLING' | 'PSE', isValid: boolean, formData: any): void {
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
    const paymentData= {
      paymentMethod: this.selectedMethod as 'CARD' | 'PSE',
      paymentDetails:
        this.selectedMethod === 'CARD'
          ? (this.formStates.CARD.formData as ICard)
          : (this.formStates.PSE.formData as IPse),
      billingAddress: this.formStates.BILLING.formData as IBillingAddress,
    };

    this.onConfirmPayment.emit(paymentData);
  }
}
