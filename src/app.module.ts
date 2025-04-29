import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { UploadModule } from './upload/upload.module';

@Module({
imports: [
     UploadModule,
     ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 1,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
