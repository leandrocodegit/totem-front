import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../model/constantes/role.enum';



@Injectable({
  providedIn: 'root'
},
)
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>('environment.urlBff '+ '/admin/login', JSON.stringify(
      {
        email: email,
        password: password
      })
      )
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('token.refresh');

    const body = new HttpParams()
      .set('client_id', 'web-app')
      .set('grant_type', 'refresh_token')
      .set('refresh_token', refreshToken! || '');

    var headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    }
    return this.http.post(`${'environment.urlBff'}/admin/token/refresh`, body, headers);
  }

  setTokens(data: any) {
    localStorage.setItem("token.acess", data.access_token);
    localStorage.setItem("token.refresh", data.refresh_token);
  }

  get accessToken(): string | null {
    return localStorage.getItem("token.acess");
  }

  public validarToken(smsToken: string): Observable<User> {
    var headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "X-auth-Header": "USER",
        "X-token-Header": localStorage.getItem("token.sms")!
      })
    }
    return this.http.get<User>('environment.urlBff' + '/admin/validate-token/sms-token/' + smsToken, headers)
  }

  public enviarToken(): Observable<User> {
    var userId: string = '';
    if (localStorage.getItem('user.id')) {
      userId = localStorage.getItem('user.id')!;
    }
    return this.http.get<User>('environment.urlBff' + `/token/send-token/id/${userId}/resend/true`)
  }

  public isLoggedIn() {
    try {
      const jwt = this.decodePayloadJWT(true);

      var expire: number = Number.parseInt(jwt.exp + "000");
      var now: number = new Date().getTime();

      const expirado = (expire <= now);
      if (expirado) {
        this.logout()
      }
      return !expirado;
    } catch (error) {
      return false;
    }
  }

  public extrairEmailUsuario() {
    try {
      const jwt = this.decodePayloadJWT();
      return jwt.preferred_username;
    } catch (error) {
      return false;
    }
  }

  isAuthorizedRoles(rolesData: Role[]): boolean {
    this.isLoggedIn();
    const tokenPayload = this.decodePayloadJWT();

    if (!tokenPayload || !tokenPayload.realm_access.roles) {
      this.limparSessao();
      return false;
    }

    const userRoles: Role[] = tokenPayload.realm_access.roles;

    if (!userRoles || !rolesData) {
      this.limparSessao();
      return false;
    }

    const hasRole = rolesData.some(role => userRoles.includes(role));

    if (!hasRole) {
      return false;
    }

    return true;
  }


  logout() {
    if (typeof window !== 'undefined') {
      this.limparSessao();
      this.router.navigate(["/login"]);

    }
  }

  limparSessao() {
    if (typeof window !== 'undefined') {
      localStorage.clear();

    }
  }

  public decodePayloadJWT(isRefresh?: boolean): any | null {
    try {
      if (typeof window !== 'undefined') {
        let token = '';
        if (isRefresh)
          token = localStorage.getItem("token.refresh")!
        else token = localStorage.getItem("token.acess")!;

        if (token) {
          return jwtDecode<any>(token);
        }
      }
    } catch (error) {
      return null;
    }

    return null;
  }

}
