import { Injectable } from '@nestjs/common';
import { Sondage, Question } from './sondage.interface';
import { Survey } from './survey';


const CODE_LENGTH = 5;
@Injectable()
export class SondageService {
  private readonly sondages: Sondage[] = [];
  private readonly surveys: Survey[] = [];

  getSurveys(): Survey[] | null {
    return this.surveys.length > 0 ? this.surveys : null;
  }

  getSurvey(code: string): Survey | null {
    
    return this.surveys.find((survey) => {
      return survey.code === code;
    });
  }

  createSurvey(questions: Question[]) {

    const id = this.sondages.length > 0 ? this.sondages[this.sondages.length - 1].id + 1 : 1;
    const code = this.gernerateCode(CODE_LENGTH);
    const createAt = new Date();
    const survey: Survey = new Survey({ id, code, questions, createAt });
    this.surveys.push(survey);

    return survey;
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
    while (this.surveys.find(({ code }) => code === newCode)) {
      newCode = this.makeid(length);
    }
    return newCode;
  }

}
