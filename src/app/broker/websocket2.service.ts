import { EventEmitter, Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { environment } from '../../environments/environment.prod';
import { AuthService } from '../components/auth/services/auth.service';
import { response } from 'express';
import { Dispositivo } from '../components/models/dispositivo.model';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService2 {

  public dashboardEmit = new EventEmitter;
  public dispositivosEmit = new EventEmitter;

  private client!: Client;

  constructor(private authService: AuthService) {

    this.client = new Client({
      brokerURL: this.getUrlBroker(),
      onConnect: () => {
        this.client.subscribe('/topic/dashboard', message =>
          this.dashboardEmit.emit(message.body)
        );
        this.client.subscribe('/topic/dispositivos', message => {
          console.log("Message", message);
          this.dispositivosEmit.emit(JSON.parse(message.body) as Dispositivo [])
        }
        );
        console.log('Conectado');

      },
      onDisconnect: () => {
        console.log('Desconectou');
        authService.refreshToken().subscribe(response => {
          authService.setTokens(response);
          this.client.brokerURL = this.getUrlBroker();
        })
      },
      onWebSocketError: () => {
        authService.refreshToken().subscribe(response => {
          authService.setTokens(response);
          this.client.brokerURL = this.getUrlBroker();
          this.client.activate();
        }, fail => {
          if (fail.error && fail.error.status && fail.error.status == 403)
            this.client.deactivate();
        })
      },
    });

    this.client.activate();



  }

  getUrlBroker() {
    return environment.urlWebSocket + '?token=' + localStorage.getItem('token.socket');
  }

  connect() {



    if (this.client && this.client.connected) {
      console.log("Enviado");

      // this.client.publish({ destination: 'app/device', body: '{}' });
    }



  }

  publicar(mensagem: string) {
    console.log("Publicado");
    this.client.publish({ destination: '/app/device', body: mensagem });
  }

  disconnect() {
    this.client.deactivate();
  }

  private subscribeToTopics() {
    this.client.subscribe('/topic/message', (message: Message) => {
      console.log('Received message:', message.body);
      // Aqui você pode tratar a mensagem recebida
    });
  }

  sendMessage(destination: string, message: string) {
    this.client.publish({ destination, body: message });
  }



}
