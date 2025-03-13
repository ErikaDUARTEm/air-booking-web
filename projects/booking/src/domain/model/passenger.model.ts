export interface IPassengerData {
  id?: string | null;
  adult: number | null;
  children: number | null;
  infants: number | null;
}

export interface IPassenger {
  id?: string | null;
  name: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  email?: string;
  confirmEmail?: string;
  phone?: string;
  departureSeat?: string;
  returnSeat?: string;
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