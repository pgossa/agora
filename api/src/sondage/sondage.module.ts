import { Module } from '@nestjs/common';
import { SondageController } from './sondage.controller';
import { SondageService } from './sondage.service';

@Module({
    controllers: [SondageController],
    providers: [SondageService]
})
export class SondageModule {}
