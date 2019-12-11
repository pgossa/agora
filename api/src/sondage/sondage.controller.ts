import { Controller, Get, Post, Param, Body, Delete, HttpException, HttpStatus, HttpCode, Req} from '@nestjs/common';
import { SondageService } from './sondage.service';
import { DeviceService } from '../service/device.service';
import { SondageDto } from './sondage.dto';
import { Request } from 'express';

@Controller('sondage')
export class SondageController {
  constructor(
    private readonly sondageService: SondageService,
    private readonly deviceService: DeviceService
  ) {}

  @Get()
  @HttpCode(HttpStatus.FOUND)
  callGetSondages(@Req() request: Request): object|HttpException {
    let allSondages = this.sondageService.getSondages();
    if (allSondages) {
      return this.deviceService.returnJsonDataAndLog(
        request.url,
        request.method,
        HttpStatus.FOUND,
        allSondages
      );
    } else {
      this.deviceService.throwExceptionAndLog(
        request.url,
        request.method,
        HttpStatus.NOT_FOUND,
        `No ressources found`
      );
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  callGetSondage(@Param('id') id: string, @Req() request: Request): object|HttpException {
    let oneSondage = this.sondageService.getSondage(id);
    if (oneSondage) {
      return this.deviceService.returnJsonDataAndLog(
        request.url,
        request.method,
        HttpStatus.FOUND,
        oneSondage
      );
    } else {
      this.deviceService.throwExceptionAndLog(
        request.url,
        request.method,
        HttpStatus.NOT_FOUND,
        `No ressources found with id: ${id}`
      );
    }
  }

  @Post(':sondageId/question/:questionId')
  incrementSondageResponse(@Param() params, @Body() response): string {
    return `On donne la response "${response.text}" à la question ${params.questionId} du sondage ${params.sondageId}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  callCreateSondage(@Body() sondageDto: SondageDto) {
    this.sondageService.createSondage(sondageDto);
    return this.sondageService.getSondages();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  callDeleteSondage(@Param('id') id: string, @Req() request: Request): object|HttpException {
    if (this.sondageService.deleteSondage(id)) {
      return this.deviceService.returnJsonDataAndLog(
        request.url,
        request.method,
        HttpStatus.OK,
        this.deviceService.generateJsonMessage(
          'Ressource deleted',
          HttpStatus.OK
        )
      );
    } else {
      this.deviceService.throwExceptionAndLog(
        request.url,
        request.method,
        HttpStatus.NOT_FOUND,
        `No ressources found with id: ${id}`
      );
    }
  }
}
