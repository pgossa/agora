import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Sondage } from './sondage.interface'

@WebSocketGateway()
export class SondageGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;
    id: number = 0;
    activeSondages: Array <Sondage>;
    
    async handleConnection(){


        // Notify connected clients of current users
        // this.server.emit('users', this.users);

    }

    async handleDisconnect(){

        // Notify connected clients of current users
        // this.server.emit('users', this.users);

    }

    @SubscribeMessage('chat')
    async onChat(client, message){
        client.broadcast.emit('chat', message);
    }

}