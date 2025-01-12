import { HttpHeaders } from "@angular/common/http";

const protocolo = 'https://';
const url = 'sincroled.com.br:9000';

export const environment = {
  url: protocolo + url,
  production: false,
  urlApi: protocolo + url + '/totem',
  urlbroker: protocolo + url +  '/comando',
  urlWebSocket: url,
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
