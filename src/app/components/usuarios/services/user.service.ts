import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { Page } from '../../models/Page';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public criarUsuario(user: User): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/user`, user, environment.headers)
  }

  public getUser(email: string): Observable<User> {
    return this.http.get<User>(`${environment.urlApi}/user` + email, environment.headers)
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

  public listaTodosUsuarios(page?: PageEvent): Observable<Page<User>> {
    return this.http.get<Page<User>>(`${environment.urlApi}/user?page=${page?.pageIndex}&size=${page?.pageSize}` )
  }
}
