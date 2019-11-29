import { Injectable } from '@nestjs/common';
import { Sondage } from './sondage.interface';

@Injectable()
export class SondageService {
  private readonly sondages: Sondage[] = [];

  getHello(): string {
    return 'Hello World!';
  }

  createSondage(sondage: Sondage) {
    this.sondages.push(sondage);
  }

  getSondages() {
    return this.sondages;
  }
}
