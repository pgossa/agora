import { Module } from '@nestjs/common';
import { SondageModule } from './sondage/sondage.module';

@Module({
  imports: [SondageModule]
})
export class AppModule {}
