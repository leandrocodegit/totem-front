import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../model/constantes/role.enum';
import { environment } from '../../../../environments/environment.prod';
import { Dispositivo } from '../../models/dispositivo.model';



@Injectable({
  providedIn: 'root'
},
)
export class DispositivoService {

  constructor(
    private readonly http: HttpClient) { }

  public listaTodosDispositivos(): Observable<Dispositivo> {
    return this.http.get<any>(`${environment.urlApi}/dipositivo`, environment.headers)
  }

  public listaTodosDispositivosPorStatus(status: string): Observable<Dispositivo> {
    return this.http.get<any>(`${environment.urlApi}/dipositivo/status/${status}`, environment.headers)
  }

  public listaTodosDispositivosPorMac(mac: string): Observable<Dispositivo> {
    return this.http.get<any>(`${environment.urlApi}/dipositivo/${mac}`, environment.headers)
  }
}
