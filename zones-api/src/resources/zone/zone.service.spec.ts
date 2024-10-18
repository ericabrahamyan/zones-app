import { Test, TestingModule } from '@nestjs/testing';
import { ZoneService } from './zone.service';
import { DatabaseService } from '../../database/database.service';
import { ConfigService } from '@nestjs/config';
import { CreateZoneDto } from './dto/create-zone.dto';
import { Zone } from './entities/zone.entity';
import { v4 as uuidv4 } from 'uuid';

describe('ZoneService', () => {
  let service: ZoneService;
  let databaseService: DatabaseService;

  const mockZones: Zone[] = [
    {
      id: uuidv4(),
      name: 'Zone 1',
      points: [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ],
    },
    {
      id: uuidv4(),
      name: 'Zone 2',
      points: [
        [1, 2],
        [3, 4],
        [5, 6],
        [7, 8],
      ],
    },
    {
      id: uuidv4(),
      name: 'Zone 3 (Invalid points)',
      points: [
        [10, 290],
        [15, 15],
        [250, 250],
        [250, 10],
      ],
    },
  ];

  const mockConfigService = {
    get: jest.fn().mockReturnValue('testing.csv'),
  };

  beforeEach(async () => {
    const mockDatabaseService = {
      getAllRecords: jest.fn().mockResolvedValue(mockZones),
      insertRecord: jest.fn(),
      deleteRecordById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZoneService,
        { provide: DatabaseService, useValue: mockDatabaseService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<ZoneService>(ZoneService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllZones', () => {
    it('should return an array of zones', async () => {
      const result = await service.getAllZones();
      expect(result).toBe(mockZones);
      expect(databaseService.getAllRecords).toHaveBeenCalled();
    });
  });

  describe('createZone', () => {
    it('should call database service insert method using the payload', async () => {
      const createZoneDto: CreateZoneDto = {
        name: 'New Zone',
        points: [
          [10, 20],
          [30, 40],
          [50, 60],
          [70, 80],
        ],
      };

      const insertSpy = jest.spyOn(databaseService, 'insertRecord');
      await service.createZone(createZoneDto);
      expect(insertSpy).toHaveBeenCalledWith(
        expect.objectContaining(createZoneDto),
      );
    });

    it('should reorder and validate points if they do not form a valid polygon', async () => {
      const createZoneDto: CreateZoneDto = {
        name: 'Invalid Zone',
        points: [
          [250, 250],
          [10, 290],
          [250, 10],
          [15, 15], // Initially in an invalid order
        ],
      };

      const expectedPoints = [
        [15, 15],
        [250, 10],
        [250, 250],
        [10, 290],
      ];

      const insertSpy = jest
        .spyOn(databaseService, 'insertRecord')
        .mockImplementation(async (zone: Zone) => {
          expect((zone as Zone).points).toEqual(expectedPoints);
          return Promise.resolve();
        });

      await service.createZone(createZoneDto);

      expect(insertSpy).toHaveBeenCalled();
      expect((insertSpy.mock.calls[0][0] as Zone).points).toEqual(
        expectedPoints,
      );
    });
  });

  describe('deleteZone', () => {
    it('should delete the zone by id', async () => {
      const zoneId = mockZones[0].id;

      const deleteSpy = jest.spyOn(databaseService, 'deleteRecordById');

      await service.deleteZone(zoneId);

      expect(deleteSpy).toHaveBeenCalledWith(zoneId);
    });
  });
});
