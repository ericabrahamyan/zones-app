import { v4 as uuidv4 } from 'uuid';
import {
  IsUUID,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';
import { IsPoint } from '../../../validators/IsPoint';

export class Zone {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(4, { message: 'Zone must have exactly 4 points.' })
  @ArrayMaxSize(4, { message: 'Zone must have exactly 4 points.' })
  @IsPoint({
    each: true,
    message: 'Each point must be an array of two numbers.',
  })
  points: [number, number][];

  constructor({ name, points }: Omit<Zone, 'id'>) {
    this.id = uuidv4();
    this.name = name;
    this.points = points;
  }
}
