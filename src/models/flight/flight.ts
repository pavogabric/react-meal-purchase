import { FlightPassenger } from "./flight-passenger";

export interface Flight {
  route: string;
  duration: string;
  passengers: FlightPassenger[];
}