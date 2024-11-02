import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: true,
  urlApi: 'vps55601.publiccloud.com.br:8000',
  urlWebSocket: 'ws://vps55601.publiccloud.com.br:8000/ws',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
