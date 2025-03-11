
export interface IPaymentData {
  id?: number;
  paymentMethod: 'CARD' | 'PSE';
  subtotal: number;
  total: number;
  discount: number;
  paymentDetails: ICard | IPse;
  billingAddress: IBillingAddress;
}
export interface IPaymentMethod {
  id?: string;
}

export interface ICard extends IPaymentMethod {
  number: string;
  holderName: string;
  expirationDate: string;
  cvv: number;
  countryIssue: string;
}

export interface IPse extends IPaymentMethod {
  holderName: string;
  email: string;
}
export interface IBillingAddress {
  id?: number;
  addressOne: string;
  addressTwo: string;
  country: string;
  city: string;
  state: string;
  postalCode: number;
  phoneNumber: string;
  email: string;
}
