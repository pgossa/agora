import { Injectable, ConflictException } from '@nestjs/common';
import { Sondage, Question } from './sondage.interface';
import { SurveyEntity } from './survey.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionEntity, QuestionType } from './question.entity';
import { AnswerEntity } from './answer.entity';
import { v4 as Uuid } from 'uuid';

const CODE_LENGTH = 5;
@Injectable()
export class SondageService {
  constructor(
    @InjectRepository(SurveyEntity)
    private readonly surveyRepository: Repository<SurveyEntity>,
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) { }

  private readonly sondages: Sondage[] = [];
  private readonly surveys: SurveyEntity[] = [];

  async getSurveys(): Promise<SurveyEntity[] | null> {
    return this.surveyRepository.find({
    });
  }

  async getSurvey(code: string): Promise<SurveyEntity | null> {
    return await this.surveyRepository.findOne({ where: { code } });
  }

  async getSurveyAdmin(uuid: string): Promise<SurveyEntity | null> {
    return this.surveyRepository.findOne({ where: { uuid } });
  }

  async createSurvey(questions: Question[]) {

    const code = await this.gernerateCode(CODE_LENGTH);
    const newSurvey = new SurveyEntity();

    newSurvey.code = code;
    newSurvey.uuid = Uuid();

    newSurvey.questions = questions.map((question, indexQuestion) => {
      const newQuestion = new QuestionEntity();
      newQuestion.text = question.text;
      newQuestion.type = question.type;
      if (question.answers) {
        newQuestion.answers = question.answers.map((answer, indexAnswer) => {
          const newAnswer = new AnswerEntity();
          newAnswer.text = answer.text;
          newAnswer.default = true;
          return newAnswer;
        });
      }
      return newQuestion;
    });

    return this.surveyRepository.save(newSurvey);
  }

  async addAnswer(code: string, questionId: number, text: string[]) {
    const question = await this.questionRepository.findOne({
      where:
      {
        id: questionId,
        // type: QuestionType.TEXT,
        // survey: { code },
      },
    });
    if (!question) {
      throw new ConflictException('not found');
    }
    console.log(text)
    text.map((str) => {
      let answerIndex;
      if (question.answers.length > 0) {
        answerIndex = question.answers.findIndex(q => q.text === str);
      }

      if (answerIndex !== undefined && answerIndex !== -1) {
        question.answers[answerIndex].count = question.answers[answerIndex].count + 1;
      } else {
        const newAnswer = new AnswerEntity();
        newAnswer.text = str;
        newAnswer.count = 1;
        question.answers.push(newAnswer);
      }
    });

    return await this.questionRepository.save(question);
  }
  async incrementAnswer(code: string, questionId: number, answerId: number) {
    const answer = await this.answerRepository.findOne({
      where:
      {
        id: answerId,
        default: true,
        question: {
          id: questionId,
          type: QuestionType.QCM,
        },
        survey: { code },
      },
    });
    if (!answer) {
      throw new ConflictException('not found');
    }
    answer.count = answer.count + 1;
    return await this.answerRepository.save(answer);
  }

  async deleteSurvey(uuid: string) {
    const survey = await this.surveyRepository.findOne({ where: { uuid } });
    if (!survey) {
      throw new ConflictException('not found');
    }
    return this.surveyRepository.remove(survey);
  }

  async resetSurvey(uuid: string) {
    const survey = await this.surveyRepository.findOne({ where: { uuid } });
    if (!survey) {
      throw new ConflictException('not found');
    }
    survey.questions = survey.questions.map((question) => {
      const newQuestion = question;
      if (question.answers) {
        switch (newQuestion.type) {
          case QuestionType.QCM:
            newQuestion.answers = newQuestion.answers.map((answer) => {
              const newAnswer = answer;
              newAnswer.count = 0;
              return newAnswer;
            });
            break;
          case QuestionType.TEXT:
            newQuestion.answers = [];
            break;

          default:
            break;
        }
      }
      return newQuestion;
    });
    return await this.surveyRepository.save(survey);
  }

  async deleteSurveys() {
    const surveys = await this.surveyRepository.find();
    if (!surveys) {
      throw new ConflictException('not found');
    }
    return this.surveyRepository.remove(surveys);
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

  async gernerateCode(length) {
    let newCode = this.makeid(length);
    while (await this.surveyRepository.findOne({ where: { code: newCode } })) {
      newCode = this.makeid(length);
      console.log('Try new code');
    }
    return newCode;
  }

}
