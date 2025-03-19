import { HttpClient, HttpContext, HttpEventType, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { __await } from 'tslib';
import { catchError, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../model/constantes/role.enum';
import { environment } from '../../../../environments/environment.prod';
import { Dispositivo } from '../../models/dispositivo.model';
import { Cor } from '../../models/cor.model';
import { Filtro } from '../../models/constantes/filtro';
import { PageEvent } from '@angular/material/paginator';
import { Page } from '../../models/Page';
import { Sort } from '@angular/material/sort';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { Tipoconfiguracao } from '../../models/constantes/tipo-configuracao';



@Injectable({
  providedIn: 'root'
},
)
export class ComandoService {

  public temporizadorEmit = new EventEmitter;
  public testeEmit = new EventEmitter

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) { }

  private getParaToken() {
    return `?token=${this.authService.comandoToken}`
  }

  public criarTemporizador(idCor: string, id: number): Observable<any> {
    return this.http.get<any>(`${environment.urlbroker}/temporizar/${idCor}/${id}${this.getParaToken()}`)
  }

  public sincronizarDispositivo(id: number, tipo: Tipoconfiguracao): Observable<any> {

    return new Observable<any>(obs => {
      const eventSource = new EventSource(`${environment.urlbroker}/${id}/${tipo}${this.getParaToken()}`, {
        withCredentials: false,
      });

      eventSource.addEventListener('message', (evt: any) => {
        this.temporizadorEmit.emit(evt.data);
      });

      eventSource.addEventListener('error', (err) => {
        eventSource.close();
        obs.complete();
      });

      return () => {
        eventSource.close();
      };
    })
  }

  public sincronizar(responder: boolean, logs: any[]): Observable<any> {

    return new Observable<any>(obs => {
      const eventSource = new EventSource(`${environment.urlbroker}/sincronizar/${responder}${this.getParaToken()}`, {
        withCredentials: false
      });

      eventSource.addEventListener('message', (evt: any) => {
        const falha = evt.data.includes('não') || evt.data.toUpperCase().includes('FALHA');
        const naoEncontrado = evt.data.includes('não encontrado');
        if(evt.data.includes('offline'))
          logs.push({ severity: 'danger', status: 'Offline', detail: evt.data, tipo: 'Não enviado' });
       else logs.push({ severity: falha ? (naoEncontrado ? 'warn' : 'danger') : 'success', status: falha ? 'Falha' : 'Concluido', detail: evt.data, tipo: falha ? (naoEncontrado ? 'Não enviado' : 'Sem resposta') : 'Ok' });
      });

      eventSource.addEventListener('error', (err) => {
        eventSource.close();
        obs.complete();
      });

      return () => {
        eventSource.close();
      };
    })
  }

  public enviarComandoRapido(idCor: string, id: number): Observable<any> {

    return new Observable<any>(obs => {
      const eventSource = new EventSource(`${environment.urlbroker}/flux/temporizar/${idCor}/${id}${this.getParaToken()}`, {
        withCredentials: false
      });

      eventSource.addEventListener('message', (evt: any) => {
        this.temporizadorEmit.emit(evt.data);
      });

      eventSource.addEventListener('error', (err) => {
        eventSource.close();
        obs.complete();
      });

      return () => {
        eventSource.close();
        this.temporizadorEmit.emit('close');
      };
    })
  }

  public cancelarComandoRapido(id: number): Observable<any> {

    return new Observable<any>(obs => {
      const eventSource = new EventSource(`${environment.urlbroker}/flux/temporizar/${id}${this.getParaToken()}`, {
        withCredentials: false
      });

      eventSource.addEventListener('message', (evt: any) => {
        this.temporizadorEmit.emit(evt.data);
      });

      eventSource.addEventListener('error', (err) => {
        eventSource.close();
        obs.complete();
      });

      return () => {
        eventSource.close();
      };
    })
  }

  public sincronizarTudo(): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/comando/sincronizar/false${this.getParaToken()}`, environment.headers)
  }

  public enviarComandoTemporizado(idCor: string, id: number, cancelar: boolean): Observable<any> {
    return this.http.post<any>(`${environment.urlApi}/cor/temporizar${this.getParaToken()}`, {
      idCor: idCor,
      id: id,
      cancelar: cancelar
    })
  }

  public testar(id: number): Observable<any> {
    return new Observable<any>(obs => {
      const eventSource = new EventSource(`${environment.urlbroker}/teste/${id}${this.getParaToken()}`, {
        withCredentials: false
      });

      eventSource.addEventListener('message', (evt: any) => {
        this.testeEmit.emit(evt.data);
      });

      eventSource.addEventListener('error', (err) => {
        eventSource.close();
        obs.complete();
      });

      return () => {
        eventSource.close();
      };
    })
  }

  public uploadFirmware(id: number, file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${environment.url}/firmware/upload/${id}${this.getParaToken()}`, formData)
  }

  public updateFirmware(id: number): Observable<any> {
    return this.http.get<any>(`${environment.url}/firmware/update/${id}${this.getParaToken()}`)
  }

/*   public updateFirmware(response: any): Observable<any> {
    return new Observable<any>(obs => {
      const eventSource = new EventSource(`${environment.urlbroker}/firmware/update/${response.id}${this.getParaToken()}`);

      eventSource.addEventListener('message', (evt: any) => {
        response.data = evt.data;
        if(evt.data.includes('Online')){
          this.testeEmit.emit(evt.data);
        }
      });

      eventSource.addEventListener('error', (err) => {
        eventSource.close();
        obs.complete();
      });

      return () => {
        eventSource.close();
      };
    })
  } */
}
