import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../model/constantes/role.enum';
import { environment } from '../../../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
},
)
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(environment.urlApi + '/auth/login', JSON.stringify(
      {
        email: email,
        password: password
      }),environment.headers
      )
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('token.refresh');
    return this.http.get(`${environment.urlApi}/auth/refresh?token=${refreshToken}`);
  }

  setTokens(data: any) {
    localStorage.setItem("token.access", data.access_token);
    localStorage.setItem("token.refresh", data.refresh_token);
    localStorage.setItem("token.socket", data.socket_token);
  }

  get accessToken(): string | null {
    return localStorage.getItem("token.acess");
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
