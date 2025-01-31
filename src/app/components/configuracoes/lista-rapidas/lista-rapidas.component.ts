import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Cor } from '../../models/cor.model';
import { CorService } from '../../dispositivos/services/cor.service';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dispositivo } from '../../models/dispositivo.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MatButtonModule } from '@angular/material/button';
import { ComandoService } from '../../dispositivos/services/comando.service';
import { NgIf } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TimelineModule } from 'primeng/timeline';
import { LogService } from '../../dispositivos/services/log.service';
import { Log } from '../../models/log.model';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-lista-rapidas',
  standalone: true,
  imports: [
    MatDialogModule,
    ToastModule,
    MatButtonModule,
    MatDialogModule,
    NgIf,
    TimelineModule,
    RouterModule,
    MatProgressBar
  ],
  providers: [
    MessageService
  ],
  templateUrl: './lista-rapidas.component.html',
  styleUrl: './lista-rapidas.component.scss'
})
export class ListaRapidasComponent implements OnInit, OnDestroy {

  @Input() cores: Cor[] = [];
  @Input() dispositivo?: Dispositivo;
  private acao = true;
  protected aguardandoResposta = false;
  protected logs: Log[] = [];
  protected corSelecionada: any;
  protected mac: any;
  protected interval: any;
  protected timer: any;

  constructor(
    private readonly corService: CorService,
    private readonly dispositivoService: DispositivoService,
    private readonly messageService: MessageService,
    private readonly comandoService: ComandoService,
    private readonly logService: LogService,
    private readonly routerActive: ActivatedRoute
  ) {

    dispositivoService.selectDispositivo.subscribe(data => {
      this.dispositivo = data;
    })

    comandoService.temporizadorEmit.subscribe(data => {

      if (data) {
        if (data.includes('não') || data.toUpperCase().includes('FALHA')) {
          this.messageService.add({
            severity: 'error',
            summary: 'Comando rápido',
            detail: data
          });
        }
        else if (data.includes('ok')) {
          this.messageService.add({
            severity: 'info',
            summary: 'Comando rápido',
            detail: 'Comando foi executado com sucesso'
          });
        } else if (data.includes('aceito')) {
          // this.dispositivo.timer = this.acao;
          this.messageService.add({
            severity: 'success',
            summary: 'Comando rápido',
            detail: data
          });
          this.carregarDispositivo();
          this.aguardandoResposta = false;
          this.carregarLogs();
        }
      }
    });
  }

  ngOnInit(): void {
    this.aguardandoResposta = false;
    this.corService.listaTodasCoresRapidas().subscribe(response => this.cores = response)
    this.routerActive.params.subscribe(param => {
      this.mac = param['mac'];
      this.carregarDispositivo();
    });
    this.carregarLogs();
  }

  carregarDispositivo() {
    this.dispositivoService.buscarDicpositivo(this.mac).subscribe(response => {
      this.dispositivo = response;
      if (this.dispositivo.operacao.modoOperacao == 'TEMPORIZADOR') {
        this.corSelecionada = this.dispositivo.operacao.corTemporizador.id;
        this.interval = setInterval(() => {
          this.calcularDiferenca(this.dispositivo?.operacao.time);
        }, 1000);
      }
    });
  }

  carregarLogs() {
    this.logService.listaLogstipo('TIMER_CONCLUIDO').subscribe(response => this.logs = response.content);
  }

  temporizar(cor: string) {
    if (!this.aguardandoResposta) {
      this.corSelecionada = cor;
      this.timer = '';
      clearInterval(this.interval);
      var delay = setInterval(() => {
        this.aguardandoResposta = false;
        clearInterval(delay);
      }, 30000)
      this.acao = true;
      this.aguardandoResposta = true;
      if (this.dispositivo && this.dispositivo.mac) {
        this.comandoService.enviarComandoRapido(cor, this.dispositivo.mac).subscribe({
          complete: () => {
            this.aguardandoResposta = false;
          },
          error: (err) => { }
        });
      }
    }
  }


  cancelar() {
    this.acao = false;
    this.corSelecionada = '';
    this.aguardandoResposta = true;
    this.comandoService.cancelarComandoRapido(this.dispositivo!.mac).subscribe({
      complete: () => {
        this.aguardandoResposta = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Falha',
          detail: 'Erro ao enviar comando'
        });
      }
    });
  }

  calcularDiferenca(data: Date | undefined): void {
    const data1: Date = new Date;
    if (data) {
      const data2 = new Date(data);
      if (data2) {
        const diffMs = Math.abs(data2.getTime() - data1.getTime());
        const diffSegundos = Math.floor(diffMs / 1000);
        const diffMinutos = Math.floor(diffSegundos / 60);
        const diffHoras = Math.floor(diffMinutos / 60);
        this.timer = `${diffHoras % 24}:${diffMinutos % 60}:${diffSegundos % 60}`;
        if(diffHoras == 0 && diffMinutos == 0 && diffSegundos == 0){
          this.timer = '';
          this.cancelar();
          clearInterval(this.interval);
        }
      } else this.timer = '';
    } else this.timer = '';
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.timer = '';
  }

}
