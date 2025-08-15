import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('PORT in main.ts', process.env.PORT);
  console.log('NODE_ENV in main.ts', process.env.NODE_ENV);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
