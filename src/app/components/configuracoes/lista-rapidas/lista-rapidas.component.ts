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

@Component({
  selector: 'app-lista-rapidas',
  standalone: true,
  imports: [
    MatDialogModule,
    ToastModule,
    MatButtonModule,
    MatDialogModule,
    NgIf
  ],
  providers: [
    MessageService
  ],
  templateUrl: './lista-rapidas.component.html',
  styleUrl: './lista-rapidas.component.scss'
})
export class ListaRapidasComponent implements OnInit {

  @Input() cores: Cor[] = [];
  @Input() dispositivo: Dispositivo;
  private acao = true;
  protected aguardandoResposta = false;
  protected retentativa = {
    retentar: 10,
    cor: ''
  };

  constructor(
    private readonly corService: CorService,
    private readonly dispositivoService: DispositivoService,
    private readonly messageService: MessageService,
    private readonly comandoService: ComandoService,
    private dialogRef: MatDialogRef<ListaRapidasComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {

    comandoService.temporizadorEmit.subscribe(data => {

      if (data) {
        if (data == 'close') {
          if (this.retentativa.retentar < 3) {
            this.temporizar(this.retentativa.cor);
            this.retentativa.retentar++;

          }
        }
        if (data.includes('não') || data.toUpperCase().includes('FALHA')) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Comando rápido',
            detail: data
          });
          if (this.retentativa.retentar > 3) {
            this.retentativa.retentar = 0;
            this.aguardandoResposta = true;
          }else{
            this.aguardandoResposta = false;
          }
        }
        else if (data.includes('ok')) {
          this.messageService.add({
            severity: 'info',
            summary: 'Comando rápido',
            detail: 'Comando foi executado com sucesso'
          });
        } else if (data.includes('aceito')) {
          this.dispositivo.timer = this.acao;
          this.messageService.add({
            severity: 'success',
            summary: 'Comando rápido',
            detail: data
          });
          this.retentativa.retentar = 10;
        }
      }
    })
    this.dispositivo = data;
  }

  ngOnInit(): void {
    this.corService.listaTodasCoresRapidas().subscribe(response => this.cores = response)
  }

  temporizar(cor: string) {
    if (!this.aguardandoResposta || this.retentativa.retentar < 3) {
      this.acao = true;
      this.aguardandoResposta = true;
      if (this.retentativa.retentar == 10) {
        this.retentativa.cor = cor;
      }else{
        this.messageService.add({
          severity: 'warn',
          summary: 'Nova tentetiva',
          detail: 'Comando reenviado'
        });
      }
      this.comandoService.enviarComandoRapido(cor, this.dispositivo.mac).subscribe({
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


  cancelar() {
    this.acao = false;
    this.aguardandoResposta = true;
    this.comandoService.cancelarComandoRapido(this.dispositivo.mac).subscribe({
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
