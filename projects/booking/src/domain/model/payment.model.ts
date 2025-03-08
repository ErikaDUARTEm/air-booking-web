
export interface IPaymentData {
  id?: string;
  paymentMethod: 'CARD' | 'PSE';
  billingAddress: IBillingAddress;
  subtotal: number;
  total: number;
  discount: number;
  paymentDetails: ICard | IPse;
}
export interface IPaymentMethod {
  id?: string;
}

export interface ICard extends IPaymentMethod {
  number: string;
  holderName: string;
  expirationDate: string;
  cvv: string;
  countryIssue: string;
}

export interface IPse extends IPaymentMethod {
  holderName: string;
  email: string;
}
export interface IBillingAddress {
  id?:string;
  addressOne: string;
  addressTwo: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  numberPhone: string;
  email: string;
}
