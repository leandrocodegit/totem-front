import { Component } from '@angular/core';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { MQTTModule } from '../../../MQTT.module';

@Component({
  selector: 'app-lista-dispositivos',
  standalone: true,
  imports: [
    MQTTModule
  ],
  providers: [MqttService,

  ],
  templateUrl: './lista-dispositivos.component.html',
  styleUrl: './lista-dispositivos.component.scss'
})
export class ListaDispositivosComponent {

  constructor(private mqttService: MqttService) {}

  ngOnInit() {
    this.mqttService.observe('test/topic').subscribe((message: IMqttMessage) => {
      console.log('Received message:', message.payload.toString());
    });
  }

  conectar() {
    console.log("Conectando..");




  }



}
