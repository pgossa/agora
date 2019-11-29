import { Injectable } from '@nestjs/common';
import { Sondage } from './sondage.interface';

@Injectable()
export class SondageService {
  private readonly sondages: Sondage[] = [];

  getSondages(): Sondage[]|null {
    return this.sondages.length > 0 ? this.sondages : null;
  }

  getSondage(id: string): Sondage|null {
    let sondage = null;
    let indexSondageToGet = this.findIndexById(id);
    if (null !== indexSondageToGet) {
      sondage = this.sondages[indexSondageToGet];
    }
    return sondage;
  }

  createSondage(sondage: Sondage) {
    this.sondages.push(sondage);
  }

  deleteSondage(id: string): boolean {
    let status = false;
    let indexSondageToDelete = this.findIndexById(id);
    if (null !== indexSondageToDelete) {
      this.sondages.splice(indexSondageToDelete, 1);
      status = true;
    }
    return status;
  }

  private findIndexById(id: string): number|null {
    let index = null;
    let length = this.sondages.length;
    for (let i = 0; i < length; i++) {
      if (id === this.sondages[i].id) {
        index = i;
      }
    }
    return index;
  }
}
