import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService2 {

  brokerURL = 'ws://localhost:8000/ws?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwaXp6dXJnLWFwaSIsImlhdCI6MTcyOTc5MTA5MywiZXhwIjoxNzI5ODA1NDkzLCJzdWIiOiJhZG1pbiJ9.oqDkujjyam1l8HY2b6McsL-ohwB-Hx95XrbbIsJdrMU';
  stompClient!: any ;
  private client!: Client;

  constructor() {

    const client = new Client({
      brokerURL: this.brokerURL,
      onConnect: () => {
        client.subscribe('/topic', message =>
          console.log(`Received: ${message.body}`)
        );
        console.log('Conectado');



      },
    });

    client.activate();

  }

  connect() {



    if(this.client && this.client.connected){
      this.client.publish({ destination: '/topic', body: 'First Message' });
    }



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
