export interface IPassengerData {
  id?: string | null;
  adult: number | null;
  children: number | null;
  infants: number | null;
}

export interface IPassenger {
  name: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  email?: string;
  confirmEmail?: string;
  phone?: string;
}


export interface Infant extends IPassenger {
  email: never;
  confirmEmail: never;
  phone: never;
}

export interface IFlightDates {
  departure: string; 
  return: string | null;
}

export interface ILocation {
  abbreviation: string;
  airport: string;
  name: string;
}

export interface IFlightData {
  dates: IFlightDates;
  origin: ILocation;
  destination: ILocation;
  passengers: IPassengerData;
}

export interface IFlightMock {
  aircraftModel: string;
  arrivalTime: string;
  departureTime: string;
  destination: string;
  duration: string;
  flightId: string;
  flightNumber: string;
  operatingAirline: string;
  origin: string;
  prices: number;
  tax: number;
}

export interface IFlightSelection {
  departureFlight: IFlightMock;
  returnFlight: IFlightMock;
}