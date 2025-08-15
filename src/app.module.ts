/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { configuration } from './configs/env/env.config';
import { envValidationSchema } from './configs/env/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV?.trim()}`,
      load: [configuration],
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
