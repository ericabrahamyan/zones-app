import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './env.validation';
import { ZoneModule } from './resources/zone/zone.module';
import { DatabaseModule } from './database/database.module';

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
