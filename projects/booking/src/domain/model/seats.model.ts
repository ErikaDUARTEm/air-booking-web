export interface IFlight {
    id: string;
    flightNumber: string;
    aircraft: string;
    seats: { [seatId: string]: ISeat };
    type: 'outbound' | 'return';
  }
  
  export interface ISeat {
    id: string;
    type: 'premium' | 'emergency' | 'favorable' | 'regular' | 'unavailable';
    price?: number;
    isAvailable: boolean;
    passenger?: string;
  }
  
  export interface IPassenger {
    id: string;
    name: string;
    lastName: string;
    documentId: string;
    selectedSeat?: string;
  }