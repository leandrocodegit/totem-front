import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../auth/models/user.model';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public getUser(email: string): Observable<User> {
    return this.http.get<User>(environment.urlBff + '/user/email/' + email, environment.headers)
  }

  public listaTodosUsuarios(): Observable<User> {
    return this.http.get<User>(environment.urlBff + '/admin')
  }
}
