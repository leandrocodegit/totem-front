import { Component } from '@angular/core';
import { rxStompServiceFactory } from '../../../../rx-stomp-service-factory';
import { WebSocketService } from '../../../broker/websocket.service';

@Component({
  selector: 'app-lista-dispositivos',
  standalone: true,
  imports: [

  ],
  providers: [
    {
      provide: WebSocketService,
      useFactory: rxStompServiceFactory,
      deps: [],
    },
  ],
  templateUrl: './lista-dispositivos.component.html',
  styleUrl: './lista-dispositivos.component.scss'
})
export class ListaDispositivosComponent {

  constructor(private websocketService: WebSocketService) {}

  ngOnInit() {

    this.websocketService.stompClient.subscribe('/topic/messages', (message) => {
      if (message.body) {
        console.log('Mensagem recebida: ' + message.body);
        // Aqui você pode processar a mensagem recebida
      }
    });

  }

  conectar() {
    console.log("Conectando..");
    this.websocketService.stompClient.publish({
      destination: '/topic/messages',
      body: 'teste',
    });


  }



}
