import { Test, TestingModule } from '@nestjs/testing';

import { CreateZoneDto } from './dto/create-zone.dto';
import { Zone } from './entities/zone.entity';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';

describe('ZoneController', () => {
  let controller: ZoneController;
  let service: ZoneService;

  const mockZones: Zone[] = [
    {
      id: '1',
      name: 'Zone 1',
      points: [
        [12.3, 12.0],
        [16.3, 12.0],
        [16.3, 8.0],
        [11.4, 8.7],
      ],
    },
    {
      id: '2',
      name: 'Zone 2',
      points: [
        [5.3, 12.0],
        [8.3, 12.0],
        [8.3, 8.0],
        [4.4, 4.7],
      ],
    },
  ];

  const mockZoneService = {
    getAllZones: jest.fn(),
    createZone: jest.fn(),
    deleteZone: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZoneController],
      providers: [{ provide: ZoneService, useValue: mockZoneService }],
    }).compile();

    controller = module.get<ZoneController>(ZoneController);
    service = module.get<ZoneService>(ZoneService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllZones', () => {
    it('should return an array of zones', async () => {
      mockZoneService.getAllZones.mockResolvedValue(mockZones);

      const result = await controller.getAllZones();

      expect(result).toEqual(mockZones);
      expect(service.getAllZones).toHaveBeenCalled();
    });
  });

  describe('createZone', () => {
    it('should create a new zone', async () => {
      const createZoneDto: CreateZoneDto = {
        name: 'Zone 3',
        points: [
          [10.0, 10.0],
          [11.0, 11.0],
          [12.0, 12.0],
          [13.0, 13.0],
        ],
      };

      await controller.createZone(createZoneDto);

      expect(service.createZone).toHaveBeenCalledWith(createZoneDto);
    });
  });

  describe('deleteZone', () => {
    it('should delete a zone by ID', async () => {
      const zoneId = '1';

      await controller.deleteZone(zoneId);

      expect(service.deleteZone).toHaveBeenCalledWith(zoneId);
    });
  });
});
