import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../model/constantes/role.enum';
import { environment } from '../../../../environments/environment.prod';
import { Dispositivo } from '../../models/dispositivo.model';
import { Configuracao } from '../../models/configuracao.model';
import { Agenda } from '../../models/agenda.model';
import { Page } from '../../models/Page';
import { PageEvent } from '@angular/material/paginator';



@Injectable({
  providedIn: 'root'
},
)
export class AgendaService {

  constructor(
    private readonly http: HttpClient) { }

  public criarAgenda(agenda: Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(`${environment.urlApi}/agenda`, agenda, environment.headers)
  }

  public alterarAgenda(agenda: Agenda, removerConflitos: boolean): Observable<Agenda> {
    return this.http.patch<Agenda>(`${environment.urlApi}/agenda/${removerConflitos}`, agenda, environment.headers)
  }

  public listaTodosAgendas(page?: PageEvent): Observable<Page<Agenda>> {
    return this.http.get<Page<Agenda>>(`${environment.urlApi}/agenda?page=${page?.pageIndex}&size=${page?.pageSize}`, environment.headers)
  }

  public listaTodosAgendasPorDispositivo(mac: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${environment.urlApi}/agenda/dispositivo/${mac}`, environment.headers)
  }

  public listaTodosAgendasPorConfiguracao(id: string): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${environment.urlApi}/agenda/dispositivo/${id}`, environment.headers)
  }

  public removerAgenda(id: string): Observable<Agenda[]> {
    return this.http.delete<Agenda[]>(`${environment.urlApi}/agenda/${id}`, environment.headers)
  }
}

