import { HttpHeaders } from "@angular/common/http";

const protocolo = 'https://';
const host = 'painel.sincroled.com.br';
const porta = ":9000"
export const environment = {
  url: protocolo + host + porta,
  debug: protocolo + host + '/debug/',
  production: false,
  urlApi: protocolo + host + porta + '/totem',
  urlbroker: protocolo + host + porta +   '/comando',
  urlWebSocket: host,
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
