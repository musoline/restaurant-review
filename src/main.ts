import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Restaurant Review')
    .setDescription('The restaurant API description')
    .setVersion('1.0')
    .addTag('restaurants')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-api', app, document);

  const seederService = app.get(SeederService);
  await seederService.seedData();

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  await app.listen(3000);
}


bootstrap();
