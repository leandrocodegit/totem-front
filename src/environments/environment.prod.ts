import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  urlApi: 'https://sincroled.com.br:9000/totem',
  urlbroker: 'https://sincroled.com.br:9000/comando',
  urlWebSocket: 'sincroled.com.br',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
};
