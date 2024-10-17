import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as csvParser from 'csv-parser';

import { format } from 'fast-csv';

@Injectable()
export class DatabaseService {
  private readonly filePath: string;

  constructor(private readonly configService: ConfigService) {
    this.filePath = this.configService.get<string>('ZONES_CSV_PATH');
  }

  async getAllRecords(): Promise<any[]> {
    const results: any[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }

  /**
   * Inserts a new record into the CSV file.
   *
   * @template T - The type of the record to insert.
   * @param {T} record - The record to insert into the CSV file.
   * @returns {Promise<void>} A promise that resolves when the record has been inserted.
   */
  async insertRecord<T>(record: T): Promise<void> {
    const records = await this.getAllRecords();
    records.push(record);
    return this.writeCsv(records);
  }

  // Method to delete a record by ID
  async deleteRecordById(id: string | number): Promise<void> {
    const records = await this.getAllRecords();
    const filteredRecords = records.filter((record) => record.id !== id);
    return this.writeCsv(filteredRecords);
  }

  // Helper method to write data to the CSV file
  private writeCsv(records: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(this.filePath, {
        encoding: 'utf8',
      });
      const csvStream = format({ headers: true });

      csvStream.pipe(writableStream).on('finish', resolve).on('error', reject);

      records.forEach((record) => csvStream.write(record));
      csvStream.end();
    });
  }
}
