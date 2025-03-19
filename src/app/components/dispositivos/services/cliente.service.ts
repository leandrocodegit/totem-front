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
import { Cliente } from '../../models/cliente.model';



@Injectable({
  providedIn: 'root'
},
)
export class ClienteService {

  constructor(
    private readonly http: HttpClient) { }

  public salvarCleinte(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/cliente`, cliente, environment.headers)
  }

  public removerCliente(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/cliente/${cliente.id}`)
  }

  public pesquisarCliente(ativo: boolean, pesquisa: string): Observable<Page<Cliente>> {
    return this.http.get<Page<Cliente>>(`${environment.urlApi}/cliente/pesquisar/${ativo}/${pesquisa}`, environment.headers)
  }

  public buscarCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.urlApi}/cliente/${id}`, environment.headers)
  }

  public buscarClienteLogado(): Observable<Cliente> {
    return this.http.get<Cliente>(`${environment.urlApi}/cliente/detalhes`, environment.headers)
  }

  public listaClientes(ativo: boolean, sort?: Sort, page?: PageEvent): Observable<Page<Cliente>> {
    if(!sort){
      sort = {
        active: 'nome',
        direction: 'asc'
      }
    }
    return this.http.get<Page<Cliente>>(`${environment.urlApi}/cliente/ativo/${ativo}?page=${page?.pageIndex}&size=${page?.pageSize}&sort=${sort?.active},${sort?.direction}`, environment.headers)
  }



}
