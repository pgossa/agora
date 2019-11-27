import { Controller, Get, Req, Post} from '@nestjs/common';
import { Request } from 'express';
import { SondageService } from './sondage.service';

@Controller()
export class SondageController {
  constructor(private readonly appService: SondageService) {}

  @Get()
  getHello(@Req() request: Request): string {
    return this.appService.getHello();
  }

  @Post()
  
}
