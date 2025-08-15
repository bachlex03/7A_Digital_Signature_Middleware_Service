import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLoggerService } from './logger/logger.service';
import { GlobalExceptionFilter } from './libs/filters/global-exception.filter';
import { HttpExceptionFilter } from './libs/filters/http-exception.filter';
import { TimeExecutingInterceptor } from './libs/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter(), new HttpExceptionFilter());

  // Apply global interceptor for time execution monitoring
  app.useGlobalInterceptors(new TimeExecutingInterceptor());

  const logger = app.get(AppLoggerService);

  await app.listen(process.env.PORT as string);

  logger.debug(`🔧 Environment: ${process.env.NODE_ENV}`, 'Bootstrap');
  logger.debug(
    `🚀 This application is running on: ${await app.getUrl()}`,
    'Bootstrap',
  );

  // logger.debug(
  //   `📚 Swagger documentation: ${await app.getUrl()}/api-docs`,
  //   'Bootstrap',
  // );
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
