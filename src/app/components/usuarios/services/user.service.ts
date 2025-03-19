import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Page } from '../../models/Page';
import { PageEvent } from '@angular/material/paginator';
import { UserRequest } from '../../models/user-request.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public criarUsuario(user: any): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/user`, user, environment.headers)
  }

  public AtualizarUsuario(user: UserRequest): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/user`, user, environment.headers)
  }

  public AtualizarSenhaUsuario(user: UserRequest): Observable<any> {
    return this.http.put<any>(`${environment.urlApi}/user/password`, user, environment.headers)
  }

  public getUser(email: string): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/user/` + email, environment.headers)
  }

  public removerUser(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.urlApi}/user/` + id, environment.headers)
  }

  public mudarStatusUser(id: string): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/user/status/` + id, environment.headers)
  }

  public pesquisarUsuarios(pesquisa: string, page?: PageEvent): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${environment.urlApi}/user/pesquisar/${pesquisa}?page=${page?.pageIndex}&size=${page?.pageSize}` )
  }

  public listaTodosUsuarios(business: boolean, page?: PageEvent): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${environment.urlApi}/user/lista/${business}?page=${page?.pageIndex}&size=${page?.pageSize}` )
  }
}
