import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const seederService = app.get(SeederService);
  await seederService.seedData();

  app.enableCors({
    origin: 'https://shoufle.ge',
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
