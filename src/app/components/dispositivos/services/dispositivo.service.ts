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
import { Filtro } from '../../models/constantes/filtro';
import { PageEvent } from '@angular/material/paginator';
import { Page } from '../../models/Page';
import { Sort } from '@angular/material/sort';



@Injectable({
  providedIn: 'root'
},
)
export class DispositivoService {

  public deviceEdit!: Dispositivo;
  public corEdit!: Cor;
  public ajutarPadding = new EventEmitter;
  public mapaEdit = new EventEmitter;
  public pesquisa = new EventEmitter;
  public tabSelect = new EventEmitter;

  constructor(
    private readonly http: HttpClient) { }

  public alterarNomeDicpositivo(dispositivo: Dispositivo): Observable<any> {
    return this.http.patch<any>(`${environment.urlApi}/dispositivo`, dispositivo, environment.headers)
  }

  public salvarConfiguracao(dispositivo: Dispositivo): Observable<any> {
    return this.http.patch<any>(`${environment.urlApi}/dispositivo/configuracao`, dispositivo, environment.headers)
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

  public listaTodosDispositivosFiltro(filtro: Filtro, sort?: Sort, page?: PageEvent): Observable<Page<Dispositivo>> {
    if (!sort) {
      sort = {
        active: 'nome',
        direction: 'asc'
      }
    }
    return this.http.get<Page<Dispositivo>>(`${environment.urlApi}/dispositivo/filtro/${filtro}?page=${page?.pageIndex}&size=${page?.pageSize}&sort=${sort?.active},${sort?.direction}`, environment.headers)
  }

  public listaTodosDispositivosFiltroNaoPaginado(filtro: Filtro): Observable<Dispositivo[]> {
    return this.http.get<Dispositivo[]>(`${environment.urlApi}/dispositivo/filtro/${filtro}?unpaged=${true}`, environment.headers)
  }

  public mudarStatus(mac: string): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/dispositivo/ativar/${mac}`, environment.headers)
  }

  public sincronizar(macs: string[], teste: boolean): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/comando/sincronizar/${teste}`, macs, environment.headers)
  }

  public sincronizarTudo(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/comando/sincronizar/false`, environment.headers)
  }

  public enviarComandoTemporizado(idCor: string, mac: string, cancelar: boolean): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/cor/temporizar`, {
      idCor: idCor,
      mac: mac,
      cancelar: cancelar
    }, environment.headers)
  }

  public formatCor(cores: number[], tipoCor: string) {
    if (tipoCor == 'RBG') {
      return [
        cores[0],
        cores[2],
        cores[1],
        cores[3],
        cores[5],
        cores[4]
      ];
    } else if (tipoCor == 'GRB') {
      return [
        cores[2],
        cores[0],
        cores[1],
        cores[5],
        cores[3],
        cores[4]
      ];
    }
    return cores;
  }

  public formatCorrecao(correcao: number[], tipoCor: string) {
    if (tipoCor == 'RBG') {
      return [
        correcao[0],
        correcao[2],
        correcao[1]
      ];
    } else if (tipoCor == 'GRB') {
      return [
        correcao[2],
        correcao[0],
        correcao[1]
      ];
    }
    return correcao;
  }
}
