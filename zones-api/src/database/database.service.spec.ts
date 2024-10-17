import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let testFilePath: string;

  beforeAll(() => {
    // Define the path to the test CSV file
    testFilePath = path.join(__dirname, 'test.csv');

    // Ensure the file exists before starting tests
    fs.writeFileSync(testFilePath, 'id,name\n');
  });

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
      const newRecord = { id: '1', name: 'John Doe' };

      // Insert the new record
      await service.insertRecord(newRecord);

      // Read the file contents and verify
      const records = await service.getAllRecords();
      expect(records).toContainEqual(newRecord);
    });
  });

  describe('getAllRecords', () => {
    it('should read all records from the CSV', async () => {
      const newRecord = { id: '2', name: 'Jane Doe' };

      // Insert another record to test reading
      await service.insertRecord(newRecord);

      // Retrieve all records
      const records = await service.getAllRecords();
      expect(records).toEqual(
        expect.arrayContaining([
          { id: '1', name: 'John Doe' },
          { id: '2', name: 'Jane Doe' },
        ]),
      );
    });
  });

  describe('deleteRecordById', () => {
    it('should delete a record by ID', async () => {
      const idToDelete = '1';
      await service.deleteRecordById(idToDelete);
      // Verify that the record is deleted
      const records = await service.getAllRecords();
      expect(records).not.toContainEqual({ id: idToDelete, name: 'John Doe' });
    });
  });
});
