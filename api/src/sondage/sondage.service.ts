import { Injectable } from '@nestjs/common';
import { Sondage, Question } from './sondage.interface';


const CODE_LENGTH = 5;
@Injectable()
export class SondageService {
  private readonly sondages: Sondage[] = [];

  getSondages(): Sondage[] | null {
    return this.sondages.length > 0 ? this.sondages : null;
  }

  getSondage(codee: string): Sondage | null {
    return this.sondages.find(({ code }) => code === codee);
  }

  createSondage(questions: Question[]) {

    const id = this.sondages.length > 0 ? this.sondages[this.sondages.length - 1].id + 1 : 1;
    const code = this.gernerateCode(CODE_LENGTH);
    const sondage: Sondage = {
      id, code, questions,
    }
    this.sondages.push(sondage);
    return sondage;
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

  private findIndexById(id: number): number | null {
    let index = null;
    const length = this.sondages.length;
    for (let i = 0; i < length; i++) {
      if (id === this.sondages[i].id) {
        index = i;
      }
    }
    return index;
  }

  makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  gernerateCode(length) {
    let newCode = this.makeid(length);
    while (this.sondages.find(({ code }) => code === newCode)) {
      newCode = this.makeid(length);
    }
    return newCode;
  }

}
