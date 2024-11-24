import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  urlApi: 'http://vps55601.publiccloud.com.br:8000/totem',
  urlbroker: 'http://localhost:8082',
  urlWebSocket: 'ws://localhost:8082/ws',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
