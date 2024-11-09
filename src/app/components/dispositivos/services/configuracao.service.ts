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
import { PageEvent } from '@angular/material/paginator';
import { Page } from '../../models/Page';
import { Sort } from '@angular/material/sort';



@Injectable({
  providedIn: 'root'
},
)
export class ConfiguracaoService {

  public carregarLista = new EventEmitter

  constructor(
    private readonly http: HttpClient) { }

  public salvarConfiguracao(configuracao: Configuracao, principal: boolean): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/configuracao/${principal}`, configuracao, environment.headers)
  }

  public duplicarConfiguracao(configuracao: Configuracao): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/configuracao/duplicar`, configuracao, environment.headers)
  }

  public listaTodasConfiguracoes(sort?: Sort, page?: PageEvent): Observable<Page<Configuracao>> {
    if(!sort){
      sort = {
        active: 'nome',
        direction: 'asc'
      }
    }
    return this.http.get<Page<Configuracao>>(`${environment.urlApi}/configuracao?page=${page?.pageIndex}&size=${page?.pageSize}&sort=${sort?.active},${sort?.direction}`, environment.headers)
  }

  public removerConfiguracao(id: string): Observable<Configuracao[]> {
    return this.http.delete<Configuracao[]>(`${environment.urlApi}/configuracao/${id}`, environment.headers)
  }
}
