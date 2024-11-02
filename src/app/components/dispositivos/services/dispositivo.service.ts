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
import { Filtro } from '../../models/constantes/filtro';
import { PageEvent } from '@angular/material/paginator';
import { Page } from '../../models/Page';



@Injectable({
  providedIn: 'root'
},
)
export class DispositivoService {

  public deviceEdit!: Dispositivo;
  public configuracaoEdit!: Configuracao;
  public ajutarPadding = new EventEmitter;
  public mapaEdit = new EventEmitter;

  constructor(
    private readonly http: HttpClient) { }

  public alterarNomeDicpositivo(dispositivo: Dispositivo): Observable<any> {
    return this.http.patch<any>(`${environment.urlApi}/dispositivo`, dispositivo, environment.headers)
  }

  public pesquisarDispositivo(pesquisa: string, page?: PageEvent): Observable<Page<Dispositivo>> {
    return this.http.get<Page<Dispositivo>>(`${environment.urlApi}/dispositivo/pesquisar/${pesquisa}?page=${page?.pageIndex}&size=${page?.pageSize}`, environment.headers)
  }

  public buscarDicpositivo(mac: string): Observable<Dispositivo> {
    return this.http.get<Dispositivo>(`${environment.urlApi}/dispositivo/${mac}`, environment.headers)
  }

  public listaTodosDispositivos(page?: PageEvent): Observable<Page<Dispositivo>> {
    return this.http.get<Page<Dispositivo>>(`${environment.urlApi}/dispositivo/lista?page=${page?.pageIndex}&size=${page?.pageSize}`, environment.headers)
  }

  public listaTodosDispositivosFiltro(filtro: Filtro, page?: PageEvent): Observable<Page<Dispositivo>> {
    return this.http.get<Page<Dispositivo>>(`${environment.urlApi}/dispositivo/filtro/${filtro}?page=${page?.pageIndex}&size=${page?.pageSize}`, environment.headers)
  }

  public listaTodosDispositivosFiltroNaoPaginado(filtro: Filtro): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${environment.urlApi}/dispositivo/filtro/${filtro}?unpaged=${true}`, environment.headers)
  }

  public mudarStatus(mac: string): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/dispositivo/ativar/${mac}`, environment.headers)
  }

  public sincronizar(macs: string[],teste: boolean): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/comando/sincronizar/${teste}`, macs, environment.headers)
  }

  public sincronizarTudo(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/comando/sincronizar/false`, environment.headers)
  }
}
