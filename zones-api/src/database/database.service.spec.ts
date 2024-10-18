import { v4 as uuidv4 } from 'uuid';

import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Zone } from '../resources/zone/entities/zone.entity';
import * as path from 'path';

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
];

describe('DatabaseService', () => {
  let service: DatabaseService;
  const testFilePath = path.join(process.cwd(), `test.csv`);

  afterAll(() => {
    // Clean up the test file after tests are done
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue(testFilePath),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insertRecord', () => {
    it('should insert a record into the CSV', async () => {
      const newRecord = mockZones[0];

      await service.insertRecord(newRecord);

      const records = await service.getAllRecords();
      expect(records).toContainEqual(newRecord);
    });
  });

  describe('getAllRecords', () => {
    it('should read all records from the CSV', async () => {
      const newRecord = mockZones[1];

      await service.insertRecord(newRecord);

      const records = await service.getAllRecords();
      expect(records).toEqual(expect.arrayContaining(mockZones));
    });
  });

  describe('deleteRecordById', () => {
    it('should delete a record by ID', async () => {
      const idToDelete = mockZones[0].id;
      await service.deleteRecordById(idToDelete);
      const records = await service.getAllRecords();
      expect(records).not.toContainEqual(mockZones[0]);
    });
  });
});
