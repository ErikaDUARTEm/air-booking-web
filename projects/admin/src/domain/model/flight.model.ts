export interface IFlight {
    flightId: string;
    flightNumber: string;
    flightModel: string;
    routeId: string;
    departureTime: string; 
    arrivalTime: string;
    status: string;
    seats: number;
    tax: number;
  
    businessFullPrice: number;
    taxBusinessFullPrice: number;
    totalPriceBusinessFullPrice: number;
  
    businessBasicPrice: number;
    taxBusinessBasicPrice: number;
    totalPriceBusinessBasicPrice: number;
  
    economyFullPrice: number;
    taxEconomyFullPrice: number;
    totalPriceEconomyFullPrice: number;
  
    economyBasicPrice: number;
    taxEconomyBasicPrice: number;
    totalPriceEconomyBasicPrice: number;
  
    economyClassicPrice: number;
    taxEconomyClassicPrice: number;
    totalPriceEconomyClassicPrice: number;
  }

  export interface IFlightInfo{
    flightNumber: string;
    flightModel: string;
    routeId: string;
    departureTime: string;
    arrivalTime: string;
    state: string;
    price: number;
    BF: number;
    BB: number;
    EF: number;
    EC: number;
    EB: number;

  }

  export interface IFlightRequest {
    flightNumber: string;
    flightModel: string;
    routeId: string;
    price: number;
    departureTime: string;
    arrivalTime: string;
  }    

  export interface IFlightUpdate {
    aggregateId:string;
    flightNumber: string;
    routeId: string;
    flightModel: string;
    price: number;
    departureTime: string;
    arrivalTime: string;
  }
   export function mapFlightToRequest(flight: IFlight): IFlightInfo {
    return {
      flightNumber: flight.flightNumber,
      flightModel: flight.flightModel,
      routeId: flight.routeId,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      state: flight.status,
      price: flight.economyBasicPrice, 
      BF:flight.totalPriceBusinessFullPrice,
      BB: flight.totalPriceBusinessBasicPrice,
      EF: flight.totalPriceEconomyFullPrice,
      EC: flight.totalPriceEconomyClassicPrice,
      EB: flight.totalPriceEconomyBasicPrice,
    };
  }

  