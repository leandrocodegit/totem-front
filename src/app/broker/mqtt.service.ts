import { Injectable } from '@angular/core';
import * as mqttt from "mqtt";

@Injectable({
  providedIn: 'root'
})
export class MqttServices {

  constructor() {}

  // Método para se conectar ao broker
  connect() {
    var client = mqttt.connect('mqtt://vps55601.publiccloud.com.br', {
      port: 1883
    })

    client.on('connect', function () {
      client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('device/receive/a0:a3:b3:76:dc:37', JSON.stringify( {
            "id": "",
            "versao": "1.0",
            "ip": "192.168.15.6",
            "memoria": "268372",
             "efeito": "CILONIO",
            "responder": false,
            "leds": 14,
            "faixa": 15,
            "velocidade": 20,
            "intensidade": 255,
            "correcao": [255,255,255],
            "cor": [255,0,0, 0,255,0],
            "host": "http://192.168.15.171:4200/assets/RGBCalibrate.ino.bin"
          }))
        }
      })
    })

    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      client.end()
    })
  }

}
