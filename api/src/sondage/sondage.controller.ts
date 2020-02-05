import { Controller, Get, Post, Param, Body, Delete, HttpException, HttpStatus, HttpCode, Req, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { SondageService } from './sondage.service';
import { DeviceService } from '../service/device.service';
import { SondageDto } from './sondage.dto';
import { Request } from 'express';
import { Question } from './sondage.interface';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('survey')
export class SondageController {
  constructor(
    private readonly sondageService: SondageService,
    private readonly deviceService: DeviceService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.FOUND)
  getSurveys(@Req() request: Request){
    const surveys = this.sondageService.getSurveys();
    if (surveys) {
      return this.deviceService.returnJsonDataAndLog(
        request.url,
        request.method,
        HttpStatus.FOUND,
        surveys,
      );
    } else {
      this.deviceService.throwExceptionAndLog(
        request.url,
        request.method,
        HttpStatus.NOT_FOUND,
        `No ressources found`,
      );
    }
  }

  @Get(':code')
  @HttpCode(HttpStatus.FOUND)
  getSurvey(@Param('code') code: string, @Req() request: Request): object|HttpException {
    const survey = this.sondageService.getSurvey(code);
    if (survey) {
      return this.deviceService.returnJsonDataAndLog(
        request.url,
        request.method,
        HttpStatus.FOUND,
        survey,
      );
    } else {
      this.deviceService.throwExceptionAndLog(
        request.url,
        request.method,
        HttpStatus.NOT_FOUND,
        `No ressources found with id: ${code}`,
      );
    }
  }

  @Post(':sondageId/question/:questionId')
  incrementSondageResponse(@Param() params, @Body() response): string {
    return `On donne la response "${response.text}" à la question ${params.questionId} du sondage ${params.sondageId}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createSurvey(@Body() questions: Question[]) {
    return this.sondageService.createSurvey(questions);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  callDeleteSondage(@Param('id') id: number, @Req() request: Request): object|HttpException {
    if (this.sondageService.deleteSondage(id)) {
      return this.deviceService.returnJsonDataAndLog(
        request.url,
        request.method,
        HttpStatus.OK,
        this.deviceService.generateJsonMessage(
          'Ressource deleted',
          HttpStatus.OK,
        ),
      );
    } else {
      this.deviceService.throwExceptionAndLog(
        request.url,
        request.method,
        HttpStatus.NOT_FOUND,
        `No ressources found with id: ${id}`,
      );
    }
  }
}
