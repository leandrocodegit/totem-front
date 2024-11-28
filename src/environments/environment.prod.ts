import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  urlApi: 'http://http://169.150.1.85:8000/totem',
  urlbroker: 'http://http://169.150.1.85:8080',
  urlWebSocket: 'ws://http://169.150.1.85:8080/ws',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
