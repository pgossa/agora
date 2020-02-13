import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SurveyEntity } from './survey.entity';
import { SondageService } from './sondage.service';


interface SurveyUsers {
  code: string;
  start: number;
  end: number;
}

@WebSocketGateway()
export class SurveyGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly sondageService: SondageService,
  ) { }

  @WebSocketServer()
  server: Server;

  users: number = 0;

  surveyUsers: SurveyUsers[] = [];

  handleConnection(client: any, ...args: any[]) {

    // A client has connected
    this.users++;

    // Notify connected clients of current users
    this.server.emit('users', this.users);


    // throw new Error("Method not implemented.");
  }

  handleDisconnect(client: any) {
    // A client has disconnected
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);


    // throw new Error("Method not implemented.");
  }


  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }


  @SubscribeMessage('state')
  async handleStart(client: any, payload: any): Promise<boolean> {
    console.log(payload)
    const { code, state } = payload;
    const foundIndex = this.surveyUsers.findIndex((survey) => survey.code === code)
    if (foundIndex != -1) {
      if (state === true) {
        this.surveyUsers[foundIndex].start = this.surveyUsers[foundIndex].start + 1;
      } else {
        this.surveyUsers[foundIndex].end = this.surveyUsers[foundIndex].end + 1;
      }
      this.sendSurveyUsers(code);
      return true;
    } else {
      const newSurveyUsers: SurveyUsers = {
        code, start: 1, end: 0,
      }
      this.surveyUsers = [newSurveyUsers];
      this.sendSurveyUsers(code);
    }
    return true;
  }


  @SubscribeMessage('answer')
  async handleAnswer(client: any, payload: any): Promise<boolean> {
    const { code, questionId, id, text } = payload;
    if (id) {
      await this.sondageService.incrementAnswer(code, questionId, id);
    } else if (text) {
      await this.sondageService.addAnswer(code, questionId, text);
    }
    const survey = await this.sondageService.getSurvey(code);
    this.sendSurvey(survey);
    return true;
  }


  sendSurvey(survey: SurveyEntity) {
    this.server.emit(survey.uuid, survey);
  }

  sendSurveyUsers(code: string) {
    const foundIndex = this.surveyUsers.findIndex((survey) => survey.code === code)
    if (foundIndex != -1) {
      const surveyUsers = this.surveyUsers[foundIndex];
      this.server.emit(surveyUsers.code, { start: surveyUsers.start, end: surveyUsers.end });
    }
  }

  resetSurveyUsers(code: string) {
    this.surveyUsers = this.surveyUsers.filter((survey) => {
      return survey.code !== code;
    });

    this.server.emit(code, { start: 0, end: 0 });
  }


}
