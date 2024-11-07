import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  urlApi: 'http://localhost:8000',
  urlWebSocket: 'ws://localhost:8000/ws',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
