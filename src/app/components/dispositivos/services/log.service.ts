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
import { Log } from '../../models/log.model';



@Injectable({
  providedIn: 'root'
},
)
export class LogService {

  constructor(
    private readonly http: HttpClient) { }


  public listaLogstipo(tipo:string, sort?: Sort, page?: PageEvent): Observable<Page<Log>> {
    if(!sort){
      sort = {
        active: 'data',
        direction: 'asc'
      }
    }
    return this.http.get<Page<Log>>(`${environment.urlApi}/log/${tipo}?page=${page?.pageIndex}&size=${page?.pageSize}&sort=${sort?.active},${sort?.direction}`, environment.headers)
  }
}
