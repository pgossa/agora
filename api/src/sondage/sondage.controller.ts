import { Controller, Get, Post, Param, Body, Put, Delete, HttpException, HttpStatus, HttpCode} from '@nestjs/common';
import { SondageService } from './sondage.service';
import { SondageDto } from './sondage.dto';

@Controller('sondage')
export class SondageController {
  constructor(private readonly sondageService: SondageService) {}

  @Get()
  @HttpCode(HttpStatus.FOUND)
  getSondages() {
    let rand = Math.floor(Math.random() * Math.floor(3));
    if (0 < rand) {
      //Recup le json du sondage
      //Exemple :
      return {data: 2};
    } else {
      throw new HttpException('No sondage found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  getSondage(@Param('id') id: string): string {
    return `C'est le sondage d'id ${id}`;
  }

  @Post(':sondageId/question/:questionId')
  incrementSondageResponse(@Param() params, @Body() response): string {
    return `On donne la response "${response.text}" à la question ${params.questionId} du sondage ${params.sondageId}`;
  }

  @Post()
  async createSondage(@Body() sondageDto: SondageDto) {
    return 'This action creates a sondage';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes the sondage ${id}`;
  }
}
