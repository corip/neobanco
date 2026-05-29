import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {

  const app =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
    );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Card Issuer API')
    .setDescription('Technical challenge API')
    .setVersion('1.0')
    .build();

  const document =
    SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(
    'swagger',
    app,
    document,
  );
  await app.listen(3001);

  console.log(`Application running on port 3001`,);
}

bootstrap();