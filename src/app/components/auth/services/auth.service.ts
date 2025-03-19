import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { __await } from 'tslib';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../model/constantes/role.enum';
import { environment } from '../../../../environments/environment.prod';



@Injectable({
  providedIn: 'root'
},
)
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router) { }

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
    localStorage.setItem("token.clienteId", data.access_token);
    localStorage.setItem("token.access", data.access_token);
    localStorage.setItem("token.refresh", data.refresh_token);
    localStorage.setItem("token.comando", data.comando_token);
  }

  setCliente(data: any) {
    localStorage.setItem("cliente.nome", data.nome);
    localStorage.setItem("cliente.endereco", data.endereco);
  }

  get clienteId(): string {
    const clienteId = localStorage.getItem("token.clienteId");
    return clienteId ? clienteId : '';
}

  get accessToken(): string | null {
      return localStorage.getItem("token.access");
  }

  get comandoToken(): string | null {
    return localStorage.getItem("token.comando");
}

  public isLoggedIn() {
    try {
      const jwt = this.decodePayloadJWT(true);

      let expire: number = Number.parseInt(jwt.exp + "000");
      let now: number = new Date().getTime();

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
      return jwt.sub;
    } catch (error) {
      return '';
    }
  }

  public extrairClienteId() {
    try {
      const jwt = this.decodePayloadJWT();
      const clienteId = jwt['cliente-id'];
      return clienteId ? clienteId : '';
    } catch (error) {
      return '';
    }
  }

  public isBusiness() {
    try {
      const jwt = this.decodePayloadJWT();
      const business = jwt['business'];
      return business ? business : false;
    } catch (error) {
      return false;
    }
    return false;
  }

  isAuthorizedRoles(rolesData: Role[]): boolean {
    this.isLoggedIn();
    const tokenPayload = this.decodePayloadJWT();

    if (!tokenPayload || !tokenPayload.roles) {
      this.limparSessao();
      return false;
    }

    const userRoles: Role[] = tokenPayload.roles;

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
      this.limparSessao();
      this.router.navigate(["/login"]);
  }

  limparSessao() {
      localStorage.clear();
  }

  public decodePayloadJWT(isRefresh?: boolean): any | null {
    try {
        let token = '';
        if (isRefresh)
          token = localStorage.getItem("token.refresh")!
        else token = localStorage.getItem("token.access")!;


        if (token) {
          const decode = jwtDecode<any>(token);
          return decode;
        }
    } catch (error) {
      return null;
    }

    return null;
  }

}
