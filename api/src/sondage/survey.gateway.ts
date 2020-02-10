import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SurveyEntity } from './survey.entity';
import { SondageService } from './sondage.service';

@WebSocketGateway()
export class SurveyGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly sondageService: SondageService,
  ) { }

  @WebSocketServer()
  server: Server;

  users: number = 0;

  handleConnection(client: any, ...args: any[]) {

    // A client has connected
    this.users++;

    // Notify connected clients of current users
    this.server.emit('users', this.users);

    console.log(this.users);

    // throw new Error("Method not implemented.");
  }

  handleDisconnect(client: any) {
    // A client has disconnected
    this.users--;

    // Notify connected clients of current users
    this.server.emit('users', this.users);


    console.log(this.users);
    // throw new Error("Method not implemented.");
  }


  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('answer')
  async handleAnswer(client: any, payload: any): Promise<boolean> {
    console.log(payload)
    const { code, questionId, id, text } = payload;
    if (id) {
      await this.sondageService.incrementAnswer(code, questionId, id);
    } else if (text) {
      console.log(text)
      await this.sondageService.addAnswer(code, questionId, text);
    }
    const survey = await this.sondageService.getSurvey(code);
    console.log(survey)
    this.sendSurvey(survey);
    return true;
  }


  sendSurvey(survey: SurveyEntity) {
    console.log('survey', survey);
    this.server.emit(survey.uuid, survey);
  }
}
