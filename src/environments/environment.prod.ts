import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  urlApi: 'https://sincroled.com.br:8000/totem',
  urlbroker: 'http://sincroled.com.br:8080',
  urlWebSocket: 'sincroled.com.br',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
};
