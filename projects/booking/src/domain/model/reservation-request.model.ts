import { IPaymentData } from "./payment.model";

export interface IReservationRequest {
  // departureDate: string;
  // arrivalDate: string;
  // origin: string;
  // destination: string;
  // reservationCode: string;
  // creationDate: string;

  // originFlight: {
  //   relationalId: string;
  //   price: number;
  //   category: string;
  //   startTime: string;
  //   endTime: string;
  // };

  // destinationFlight: {
  //   relationalId: string;
  //   price: number;
  //   category: string;
  //   startTime: string;
  //   endTime: string;
  // };

  // passengers: {
  //   type: string;
  //   firstName: string;
  //   lastName: string;
  //   documentType: string;
  //   documentNumber: string;
  //   gender: string;
  //   birthdayDate: string;
  //   email: string;
  //   phoneNumber: string;
  //   originSeat: string;
  //   destinationSeat: string;
  // }[];

  paymentData: IPaymentData;
}
