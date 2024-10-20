import { MqttModule } from 'ngx-mqtt';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    MqttModule.forRoot({
      hostname: 'localhost', // ou o IP do seu broker Mosquitto
      port: 9001, // porta padrão para MQTT
      path: '', // normalmente vazio para conexões MQTT,
      username: 'broker',
      password: 'pass2020',
      clientId: 'angular_client_' + Math.random().toString(16).substr(2, 8), // ID único para o cliente
    }),
    // outros módulos
  ],
  declarations: [
    // seus componentes
  ],
  providers: [],
})
export class MQTTModule { }
