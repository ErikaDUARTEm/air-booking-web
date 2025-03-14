export interface IFlight {
  id: string;
  flightNumber: string;
  aircraft: string;
  seats: { [seatId: string]: ISeat };
  type: 'outbound' | 'return';
}

export interface ISeat {
  id: string;
  seatNumber: string;
	row: number;
	column: string,
  type: 'Business Class' | 'Economy Extra' | 'Exit' | 'Favorable' | 'Regular' | 'unavailable';
  price?: number;
  isAvailable: boolean;
  passenger?: string;
}

