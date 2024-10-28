import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../auth/models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUser(email: string): Observable<User> {
    return this.http.get<User>(environment.urlApi + '/user/email/' + email, environment.headers)
  }

  public listaTodosUsuarios(): Observable<User> {
    return this.http.get<User>(environment.urlApi + '/admin')
  }
}
