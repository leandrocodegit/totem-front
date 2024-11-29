import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  urlApi: 'http://169.150.1.85:8000/totem',
 // urlbroker: 'http://169.150.1.85:8080',
  urlWebSocket: '169.150.1.85',
  //urlApi: 'http://vps55601.publiccloud.com.br:8000/totem',
  //urlbroker: 'http://vps55601.publiccloud.com.br:8080',
  //urlApi: 'http://localhost:8081/totem',
  urlbroker: 'http://localhost:8082',
  //urlWebSocket: 'ws://localhost:8082/ws',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
