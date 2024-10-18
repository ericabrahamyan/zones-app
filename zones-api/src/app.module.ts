import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { validate } from './env.validation';
import { ZoneModule } from './resources/zone/zone.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    ZoneModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
