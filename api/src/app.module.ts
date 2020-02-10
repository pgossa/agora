import { Module } from '@nestjs/common';
import { SondageModule } from './sondage/sondage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyEntity } from './sondage/survey.entity';
import { QuestionEntity } from './sondage/question.entity';
import { AnswerEntity } from './sondage/answer.entity';
import { SurveyGateway } from './sondage/survey.gateway';

@Module({
    imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3305,
          username: 'root',
          password: 'root',
          database: 'agora',
          entities: [SurveyEntity, QuestionEntity, AnswerEntity],
          synchronize: true,
        }),
      SondageModule],
})
export class AppModule {}
