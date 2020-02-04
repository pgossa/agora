import { Injectable } from '@nestjs/common';
import { Sondage } from './sondage.interface';

@Injectable()
export class SondageService {
  private readonly sondages: Sondage[] = [];

  getSondages(): Sondage[]|null {
    return this.sondages.length > 0 ? this.sondages : null;
  }

  getSondage(id: number): Sondage|null {
    let sondage = null;
    const indexSondageToGet = this.findIndexById(id);
    if (null !== indexSondageToGet) {
      sondage = this.sondages[indexSondageToGet];
    }
    return sondage;
  }

  createSondage(sondage: Sondage) {
    console.log(this.sondages)
    sondage.id = this.sondages.length > 0 ? this.sondages[this.sondages.length - 1].id + 1 : 1;
    this.sondages.push(sondage);
  }

  deleteSondage(id: number): boolean {
    let status = false;
    const indexSondageToDelete = this.findIndexById(id);
    if (null !== indexSondageToDelete) {
      this.sondages.splice(indexSondageToDelete, 1);
      status = true;
    }
    return status;
  }

  private findIndexById(id: number): number|null {
    let index = null;
    const length = this.sondages.length;
    for (let i = 0; i < length; i++) {
      if (id === this.sondages[i].id) {
        index = i;
      }
    }
    return index;
  }
}
