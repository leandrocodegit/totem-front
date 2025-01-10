import { NgModule } from '@angular/core';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { environment } from 'src/environments/environment.prod';
export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.urlWebSocket,
  port: 9001,
  protocol: 'wss',
  path: '/ws'
}

@NgModule({
  declarations:[
   ],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
   ],
  exports: [
  ],
  providers: [

  ]
})
export class MqttAppModule { }
