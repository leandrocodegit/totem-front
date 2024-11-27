import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from '../../models/Page';
import { Sort } from '@angular/material/sort';
import { Integracao } from '../../models/integracao.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
},
)
export class IntegracaoService {

  public carregarLista = new EventEmitter

  constructor(
    private readonly http: HttpClient) { }

  public criarIntegracao(integracao: Integracao): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/integracao`, integracao, environment.headers)
  }

  public listaTodasIntegracoes(page?: PageEvent): Observable<Page<Integracao>> {
    return this.http.get<Page<Integracao>>(`${environment.urlApi}/integracao?page=${page?.pageIndex}&size=${page?.pageSize}`, environment.headers)
  }

  public removerIntegracao(nome: string): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/integracao/${nome}`, environment.headers)
  }


}
