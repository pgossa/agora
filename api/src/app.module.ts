import { Module } from '@nestjs/common';
import { SondageController } from './sondage/sondage.controller';
import { SondageService } from './sondage/sondage.service';
import { SondageModule } from './sondage/sondage.module';

@Module({
  imports: [SondageModule],
  controllers: [SondageController],
  providers: [SondageService],
})
export class AppModule {}
