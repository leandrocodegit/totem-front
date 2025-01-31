import { Component, Inject, Input, OnInit } from '@angular/core';
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
    RouterModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './lista-rapidas.component.html',
  styleUrl: './lista-rapidas.component.scss'
})
export class ListaRapidasComponent implements OnInit {

  @Input() cores: Cor[] = [];
  @Input() dispositivo?: Dispositivo;
  private acao = true;
  protected aguardandoResposta = false;
  protected logs: Log[] = [];

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
          this.aguardandoResposta = false;
          this.carregarLogs();
        }
      }
    })
    // this.dispositivo = data;
  }

  ngOnInit(): void {
    this.aguardandoResposta = false;
    this.corService.listaTodasCoresRapidas().subscribe(response => this.cores = response)
    this.routerActive.params.subscribe(param => {
      this.dispositivoService.buscarDicpositivo(param['mac']).subscribe(response => this.dispositivo = response)
    })

    this.carregarLogs()
  }

  carregarLogs() {
    this.logService.listaLogstipo('TIMER_CONCLUIDO').subscribe(response => this.logs = response.content);
  }

  temporizar(cor: string) {
    /*  console.log(this.dispositivo);
     if (this.dispositivo && this.dispositivo.mac) {
     this.comandoService.criarTemporizador(cor, this.dispositivo.mac).subscribe(() => {
       this.messageService.add({
         severity: 'info',
         summary: 'Comando rápido',
         detail: 'Comando foi executado com sucesso'
       });
     }, fail => {
       this.messageService.add({
         severity: 'error',
         summary: 'Falha',
         detail: 'Falha ao enviar comando'
       });
     })
   } */

    if (!this.aguardandoResposta) {
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
          error: (err) => {

          }
        });
      }
    }
  }


  cancelar() {
    this.acao = false;
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


}
