import { Controller, Get, Post, Param, Body, Delete, HttpException, HttpStatus, HttpCode, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { SondageService } from './sondage.service';
import { DeviceService } from '../service/device.service';
import { SondageDto } from './sondage.dto';
import { Request } from 'express';
import { Question } from './sondage.interface';
import { SurveyGateway } from './survey.gateway';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('survey')
export class SondageController {
  constructor(
    private readonly sondageService: SondageService,
    private readonly deviceService: DeviceService,
    private readonly surveyGateway: SurveyGateway,
  ) { }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async getSurveys(@Req() request: Request) {
    const surveys = await this.sondageService.getSurveys();
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
  // @HttpCode(HttpStatus.FOUND)
  async getSurvey(@Param('code') code: string, @Req() request: Request): Promise<object | HttpException> {
    const survey = await this.sondageService.getSurvey(code);
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
        `No ressources found with code: ${code}`,
      );
    }
  }

  @Post('answer/:code/:questionId')
  async addAnswer(@Param('code') code: string, @Param('questionId') questionId: number, @Body() answer) {
  
    if (answer.id) {
      await this.sondageService.incrementAnswer(code, questionId, answer.id);
    } else if (answer.text) {
      await this.sondageService.addAnswer(code, questionId, answer.text);
    }
    const survey = await this.sondageService.getSurvey(code);
    this.surveyGateway.sendSurvey(survey);
    return true;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createSurvey(@Body() questions: Question[]) {
    return this.sondageService.createSurvey(questions);
  }

  @Post('reset/:uuid')
  resetSurvey(@Param('uuid') uuid: string) {
    return this.sondageService.resetSurvey(uuid);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.OK)
  async deleteSurvey(@Param('uuid') uuid: string, @Req() request: Request): Promise<object | HttpException> {
    if (await this.sondageService.deleteSurvey(uuid)) {
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
        `No ressources found with code: ${uuid}`,
      );
    }
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteSurveys(@Req() request: Request): Promise<object | HttpException> {
    if (await this.sondageService.deleteSurveys()) {
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
        `No ressources found`,
      );
    }
  }
}
