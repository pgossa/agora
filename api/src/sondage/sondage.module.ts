import { Module } from '@nestjs/common';
import { SondageController } from './sondage.controller';
import { SondageService } from './sondage.service';
import { FormatService } from 'src/device/format.service';

@Module({
    controllers: [SondageController],
    providers: [SondageService, FormatService]
})
export class SondageModule {}
