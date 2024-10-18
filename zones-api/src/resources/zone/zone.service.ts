import { Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { Zone } from './entities/zone.entity';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ZoneService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAllZones(): Promise<Zone[]> {
    return this.databaseService.getAllRecords();
  }

  async createZone(createZoneDto: CreateZoneDto): Promise<Zone> {
    const { name } = createZoneDto;
    // make sure that the order is correct before saving to the CSV
    const points = this.sortPointsByAngle(createZoneDto.points);
    const newZone = new Zone({ name, points });
    await this.databaseService.insertRecord(newZone);
    return newZone;
  }

  private getCentroid(points: [number, number][]): [number, number] {
    const centroid = points.reduce(
      (acc, [x, y]) => {
        acc[0] += x;
        acc[1] += y;
        return acc;
      },
      [0, 0],
    );

    return [centroid[0] / points.length, centroid[1] / points.length];
  }

  private sortPointsByAngle(points: [number, number][]): [number, number][] {
    if (points.length < 3) return points; // Not enough points to form a polygon

    const centroid = this.getCentroid(points);
    return points.sort((a, b) => {
      const angleA = Math.atan2(a[1] - centroid[1], a[0] - centroid[0]);
      const angleB = Math.atan2(b[1] - centroid[1], b[0] - centroid[0]);
      return angleA - angleB;
    });
  }

  async deleteZone(id: string): Promise<void> {
    return this.databaseService.deleteRecordById(id);
  }
}
