export interface IFlight {
  flightId: string;
  flightNumber: string;
  aircraftModel: string;
  duration: Date;
  operatinAirline: string;
  origin: string;
  destination: string;
  departureTime: Date;
  arrivalTime: Date;
  tax: taxes; 
  prices: prices;
}

export interface IRequiredFlight {
  adults: number;
  children: number;
  infants: number;
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate: Date;
}

export interface IFormFlight {
  origin: {
    name: string;
    abbreviation: string;
    airport: string;
  },
  destination: {
    name: string;
    abbreviation: string;
    airport: string;
  },
  dates: {
    departure: Date;
    return: Date;
  },
  passengers: {
    adults: number;
    children: number;
    infants: number;
  }
}


interface taxes {
  standardTax: number;
  economicTax: number;
  favorableTax: number;
  executiveTax: number;
  executiveFullTax: number;
}

interface prices {
  standardPrice: number;
  economicPrice: number;
  favorablePrice: number;
  executivePrice: number;
  executiveFullPrice: number;
}