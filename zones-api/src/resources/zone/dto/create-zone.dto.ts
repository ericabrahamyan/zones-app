import {
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

import { IsPoint } from '../../../validators/IsPoint';

export class CreateZoneDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long.' })
  @MaxLength(32, { message: 'Name must be no longer than 32 characters.' })
  name: string;

  @IsArray()
  @ArrayMinSize(4, { message: 'Zone must have exactly 4 points.' })
  @ArrayMaxSize(4, { message: 'Zone must have exactly 4 points.' })
  @IsPoint({
    each: true,
    message: 'Each point must be an array of two numbers.',
  })
  points: [number, number][];
}
