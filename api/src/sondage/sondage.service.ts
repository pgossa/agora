import { Injectable, Body } from '@nestjs/common';
import { Sondage } from './sondage.interface';

@Injectable()
export class SondageService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class SondageService {
  async createSondage(@Body() Sondage sondage): 
}
