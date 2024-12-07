import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  urlApi: 'http://vps55601.publiccloud.com.br:8000/totem',
  urlbroker: 'http://vps55601.publiccloud.com.br:8080',
  urlWebSocket: 'vps55601.publiccloud.com.br',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  } 
};
