export interface FlightOffer {
  origin: {
    code: string;
    name: string;
  };
  destination: {
    code: string;
    name: string;
  };
  departureDate: string;
  returnDate: string;
  price: {
    amount: number;
    currency: string;
  };
  lastChecked: {
    hours: number;
    timeUnit: string;
  };
  image: string;
}
