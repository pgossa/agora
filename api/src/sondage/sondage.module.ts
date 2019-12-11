import { Module } from '@nestjs/common';
import { SondageController } from './sondage.controller';
import { SondageService } from './sondage.service';
import { DeviceService } from '../service/device.service';
import { Logger } from '../service/logger.service';

@Module({
    controllers: [SondageController],
    providers: [SondageService, DeviceService, Logger]
})
export class SondageModule {}
