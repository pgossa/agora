import { Module } from '@nestjs/common';
import { CatsController } from './cat/cat.controller';
import { CatsService } from './cat/cat.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}