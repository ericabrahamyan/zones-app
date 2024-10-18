import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { parse, format } from 'fast-csv';

@Injectable()
export class DatabaseService {
  private readonly filePath: string;

  constructor(private readonly configService: ConfigService) {
    this.filePath = this.configService.get<string>('CSV_FILE_PATH');
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '', { encoding: 'utf8' });
    }
  }

  async getAllRecords(): Promise<any[]> {
    const results: any[] = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(parse({ headers: true }))
        .on('data', (data) => results.push(this.deserializeRecord(data)))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }

  async insertRecord<T>(record: T): Promise<T> {
    const records = await this.getAllRecords();
    records.unshift(record); // Insert record at the beginning
    await this.writeCsv(records);
    return record;
  }

  async deleteRecordById(id: string | number): Promise<void> {
    const records = await this.getAllRecords();
    const filteredRecords = records.filter((record) => record.id !== id);
    return this.writeCsv(filteredRecords);
  }

  private writeCsv(records: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const writableStream = fs.createWriteStream(this.filePath, {
        encoding: 'utf8',
      });
      const csvStream = format({ headers: true });

      csvStream.pipe(writableStream).on('finish', resolve).on('error', reject);

      records.forEach((record) =>
        csvStream.write(this.serializeRecord(record)),
      );
      csvStream.end();
    });
  }

  private serializeRecord(record: any): any {
    return Object.fromEntries(
      Object.entries(record).map(([key, value]) => {
        if (
          Array.isArray(value) ||
          (typeof value === 'object' && value !== null)
        ) {
          return [key, JSON.stringify(value)];
        }
        return [key, value];
      }),
    );
  }

  private deserializeRecord(record: any): any {
    return Object.fromEntries(
      Object.entries(record).map(([key, value]) => {
        if (typeof value === 'string') {
          try {
            return [key, JSON.parse(value)];
          } catch (error) {
            return [key, value];
          }
        }
        return [key, value];
      }),
    );
  }
}
