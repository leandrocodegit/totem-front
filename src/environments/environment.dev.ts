import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  urlApi: 'http://localhost:8000/totem',
  urlbroker: 'http://localhost:8080',
  urlWebSocket: 'ws://localhost:8080/ws',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
