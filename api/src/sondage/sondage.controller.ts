import { Controller, Get, Post, Param, Body, Delete, HttpException, HttpStatus, HttpCode, Req} from '@nestjs/common';
import { SondageService } from './sondage.service';
import { DeviceService } from '../service/device.service';
import { SondageDto } from './sondage.dto';
import { Request } from 'express';
import { Question } from './sondage.interface';

@Controller('sondage')
export class SondageController {
  constructor(
    private readonly sondageService: SondageService,
    private readonly deviceService: DeviceService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.FOUND)
  callGetSondages(@Req() request: Request){
    const allSondages = this.sondageService.getSondages();
    if (allSondages) {
      return this.deviceService.returnJsonDataAndLog(
        request.url,
        request.method,
        HttpStatus.FOUND,
        allSondages,
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
  callGetSondage(@Param('code') code: string, @Req() request: Request): object|HttpException {
    const oneSondage = this.sondageService.getSondage(code);
    if (oneSondage) {
      return this.deviceService.returnJsonDataAndLog(
        request.url,
        request.method,
        HttpStatus.FOUND,
        oneSondage,
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
  callCreateSondage(@Body() questions: Question[]) {
    const sondage = this.sondageService.createSondage(questions);
    console.log(JSON.stringify(sondage));
    return JSON.stringify(sondage);
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
