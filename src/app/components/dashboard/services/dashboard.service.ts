import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../model/constantes/role.enum';
import { environment } from '../../../../environments/environment.prod';
import { Dispositivo } from '../../models/dispositivo.model';
import { Log } from '../../models/log.model';
import { Dashboard } from '../../models/dashboard.model';



@Injectable({
  providedIn: 'root'
},
)
export class DashboardService {

  constructor(
    private readonly http: HttpClient) { }

  public listaLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(`${environment.urlApi}/log`, environment.headers)
  }

  public recuperarDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${environment.urlApi}/dashboard`, environment.headers)
  }

}
