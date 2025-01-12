import { HttpHeaders } from "@angular/common/http";

export const environment = {
  production: false,
  urlApi: 'https://sincroled.com.br:9000/totem',
  urlbroker: 'https://sincroled.com.br:9000/comando',
  urlWebSocket: 'sincroled.com.br',
  //urlApi: 'http://localhost:8081/totem',
  //urlbroker: 'http://localhost:8082',
  //urlWebSocket: 'vps55601.publiccloud.com.br',
  headers: {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  },
};
