export interface IFlight {
  id: string;
  flightNumber: string;
  aircraft: string;
  seats: { [seatId: string]: ISeat };
  type: 'outbound' | 'return';
}

export interface ISeat {
  id: string;
  type: 'bussiness' | 'economy' | 'emergency' | 'favorable' | 'regular' | 'unavailable';
  price?: number;
  isAvailable: boolean;
  passenger?: string;
}

