import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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

  public dispositivoEdit = new EventEmitter;

  constructor(
    private readonly http: HttpClient) { }

  public buscarDicpositivo(mac: string): Observable<Dispositivo> {
    return this.http.get<Dispositivo>(`${environment.urlApi}/dispositivo/${mac}`, environment.headers)
  }

  public listaTodosDispositivos(): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${environment.urlApi}/dispositivo/lista`, environment.headers)
  }

  public listaTodosDispositivosOffline(): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${environment.urlApi}/dispositivo/offline`, environment.headers)
  }

  public listaTodosDispositivosAtivo(ativo: boolean): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${environment.urlApi}/dispositivo/ativo/${ativo}`, environment.headers)
  }

  public mudarStatus(mac: string): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/dispositivo/ativar/${mac}`, environment.headers)
  }

  public sincronizar(macs: string[]): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/comando/sincronizar`, macs, environment.headers)
  }
}
