import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  urlApi: 'http://vps55601.publiccloud.com.br:8000',
  urlWebSocket: 'ws://191.252.111.169:8000/ws',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
