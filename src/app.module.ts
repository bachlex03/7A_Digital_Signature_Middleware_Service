import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { configuration } from './configs/env/env.config';
import { envValidationSchema } from './configs/env/validation';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV?.trim()}`,
      load: [configuration],
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
