export type Point = [number, number];

export interface Zone {
  id: string;
  name: string;
  points: Point[];
}

export type ZoneInput = Omit<Zone, 'id'>;
