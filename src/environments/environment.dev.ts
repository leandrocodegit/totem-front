import { HttpHeaders } from "@angular/common/http";

const protocolo = 'http://';
const host = 'localhost';
const porta = ":9000"
export const environment = {
  url: protocolo + host + porta,
  debug: protocolo + host + ':4200/debug/',
  production: false,
  urlApi: protocolo + host + porta + '/totem',
  urlbroker: protocolo + host + porta +   '/comando',
  urlWebSocket: 'painel.sincroled.com.br',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
