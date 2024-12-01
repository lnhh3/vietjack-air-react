export type TicketResponse = {
  title: string;
  departureDate: string;
  price: number;
  ticketType: TicketType;
  fromPlace: PlaceResponse;
  destinationPlace: PlaceResponse;
  systemStatus: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
export type PlaceResponse = {
  title: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
export enum TicketType {
  ONE_WAY = "ONE_WAY",
  ROUND_TRIP = "ROUND_TRIP",
}
