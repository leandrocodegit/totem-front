import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  urlApi: 'http://sincroled.com.br:9000/totem',
  urlbroker: 'http://sincroled.com.br:9000/comando',
  urlWebSocket: 'sincroled.com.br',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }
};
