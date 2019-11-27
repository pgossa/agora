import { Module } from '@nestjs/common';
import { SondageGateway } from './sondage.gateway'
import { SondageController } from './sondage.controller';

@Module({
    providers : [ SondageGateway, SondageController ],
    controllers: [ SondageController ]
})
export class SondageModule {}
