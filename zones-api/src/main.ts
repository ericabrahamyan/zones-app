import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './global-filters/http-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 8080;
  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
  console.log(`App is running on PORT ${port}`);
}
bootstrap();
