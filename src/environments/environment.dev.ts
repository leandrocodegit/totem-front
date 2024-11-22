import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  urlApi: 'http://localhost:8081/totem',
  urlbroker: 'http://localhost:8082',
  urlWebSocket: 'ws://localhost:8082/ws',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
