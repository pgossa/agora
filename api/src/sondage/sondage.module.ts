import { Module } from '@nestjs/common';
import { SondageController } from './sondage.controller';
import { SondageService } from './sondage.service';
import { DeviceService } from '../service/device.service';
import { Logger } from '../service/logger.service';
import { SurveyEntity } from './survey.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './question.entity';
import { AnswerEntity } from './answer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SurveyEntity, QuestionEntity, AnswerEntity])],
    controllers: [SondageController],
    providers: [SondageService, DeviceService, Logger]
})
export class SondageModule { }
