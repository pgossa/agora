import { Module } from '@nestjs/common';
import { SondageController } from './sondage.controller';
import { SondageService } from './sondage.service';
import { DeviceService } from 'src/service/device.service';

@Module({
    controllers: [SondageController],
    providers: [SondageService, DeviceService]
})
export class SondageModule {}
