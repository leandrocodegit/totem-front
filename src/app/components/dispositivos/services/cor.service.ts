import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../model/constantes/role.enum';
import { environment } from '../../../../environments/environment.prod';
import { Dispositivo } from '../../models/dispositivo.model';
import { Cor } from '../../models/cor.model';
import { PageEvent } from '@angular/material/paginator';
import { Page } from '../../models/Page';
import { Sort } from '@angular/material/sort';



@Injectable({
  providedIn: 'root'
},
)
export class CorService {

  public carregarLista = new EventEmitter

  constructor(
    private readonly http: HttpClient) { }

  public salvarCor(cor: Cor, principal: boolean): Observable<Cor> {
    return this.http.post<Cor>(`${environment.urlApi}/cor/${principal}`, cor, environment.headers)
  }

  public salvarVibracao(cor: Cor): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/cor/vibracao`, cor, environment.headers)
  }

  public duplicarCor(configuracao: Cor): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/cor/duplicar`, configuracao, environment.headers)
  }

  public listaTodasConfiguracoes(rapida: boolean,vibracao: boolean, exclusiva: boolean, sort?: Sort, page?: PageEvent): Observable<Page<Cor>> {
    if(!sort){
      sort = {
        active: 'nome',
        direction: 'asc'
      }
    }
    return this.http.get<Page<Cor>>(`${environment.urlApi}/cor/${rapida}/${vibracao}/${exclusiva}?page=${page?.pageIndex}&size=${page?.pageSize}&sort=${sort?.active},${sort?.direction}`, environment.headers)
  }

  public buscarCor(id: number): Observable<Cor> {
    return this.http.get<Cor>(`${environment.urlApi}/cor/${id}`, environment.headers)
  }

  public removerCor(id: string): Observable<Cor[]> {
    return this.http.delete<Cor[]>(`${environment.urlApi}/cor/${id}`, environment.headers)
  }


}
