import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';

import { CreateZoneDto } from './dto/create-zone.dto';
import { Zone } from './entities/zone.entity';
import { ZoneService } from './zone.service';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  /**
   * Fetch all zones.
   *
   * @returns {Promise<Zone[]>} A promise that resolves to an array of Zone objects.
   */
  @Get()
  async getAllZones(): Promise<Zone[]> {
    return this.zoneService.getAllZones();
  }

  /**
   * Create a new zone and return the created zone.
   *
   * @param {CreateZoneDto} createZoneDto - The DTO containing the zone creation details.
   * @returns {Promise<Zone>} A promise that resolves to the created Zone object.
   */
  @Post()
  async createZone(@Body() createZoneDto: CreateZoneDto): Promise<Zone> {
    return this.zoneService.createZone(createZoneDto);
  }

  /**
   * Delete a zone by ID.
   *
   * @param {string} id - The ID of the zone to delete.
   * @returns {Promise<void>} A promise that resolves when the zone is deleted.
   */
  @Delete(':id')
  async deleteZone(@Param('id') id: string): Promise<void> {
    return this.zoneService.deleteZone(id);
  }
}
