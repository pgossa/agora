import { Controller, Get, Post, Param, Body, Delete, HttpException, HttpStatus, HttpCode} from '@nestjs/common';
import { SondageService } from './sondage.service';
import { DeviceService } from 'src/service/device.service';
import { SondageDto } from './sondage.dto';
import { Sondage } from './sondage.interface';

@Controller('sondage')
export class SondageController {
  constructor(
    private readonly sondageService: SondageService,
    private readonly deviceService: DeviceService
  ) {}

  @Get()
  @HttpCode(HttpStatus.FOUND)
  callGetSondages(): Sondage[]|HttpException {
    let allSondages = this.sondageService.getSondages();
    if (allSondages) {
      return allSondages;
    } else {
      throw new HttpException('No ressources found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  callGetSondage(@Param('id') id: string): Sondage|HttpException {
    let oneSondage = this.sondageService.getSondage(id);
    if (oneSondage) {
      return oneSondage;
    } else {
      throw new HttpException(`No ressource found with id ${id}`, HttpStatus.NOT_FOUND);
    }
  }

  @Post(':sondageId/question/:questionId')
  incrementSondageResponse(@Param() params, @Body() response): string {
    return `On donne la response "${response.text}" à la question ${params.questionId} du sondage ${params.sondageId}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async callCreateSondage(@Body() sondageDto: SondageDto) {
    this.sondageService.createSondage(sondageDto);
    return this.sondageService.getSondages();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  callDeleteSondage(@Param('id') id: string): object|HttpException {
    if (this.sondageService.deleteSondage(id)) {
      return this.deviceService.generateJsonMessage('Ressource deleted', HttpStatus.OK);
    } else {
      throw new HttpException(`No ressource found with id ${id}`, HttpStatus.NOT_FOUND);
    }
  }
}
