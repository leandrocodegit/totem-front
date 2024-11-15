import { Component, Inject, Input, OnInit } from '@angular/core';
import { Configuracao } from '../../models/configuracao.model';
import { ConfiguracaoService } from '../../dispositivos/services/configuracao.service';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dispositivo } from '../../models/dispositivo.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-lista-rapidas',
  standalone: true,
  imports: [
    MatDialogModule,
    ToastModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers:[
    MessageService
  ],
  templateUrl: './lista-rapidas.component.html',
  styleUrl: './lista-rapidas.component.scss'
})
export class ListaRapidasComponent implements OnInit {

  @Input() configuracoes: Configuracao[] = [];
  @Input() dispositivo: Dispositivo;

  constructor(
    private readonly configuracaoService: ConfiguracaoService,
    private readonly dispositivoService: DispositivoService,
    private readonly messageService: MessageService,
    private dialogRef: MatDialogRef<ListaRapidasComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {

    this.dispositivo = data;
  }

  ngOnInit(): void {

    this.configuracaoService.listaTodasConfiguracoesRapidas().subscribe(response => this.configuracoes = response)
  }

  enviar(configuracao: Configuracao) {
    if(this.dispositivo){
      this.dispositivoService.enviarComandoTemporizado(configuracao.id, this.dispositivo.mac, false).subscribe(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Comando rápido',
          detail: 'Comando foi enviado'
        });
        this.dispositivo.timer = true;
      }, fail => {
        this.messageService.add({
          severity: 'error',
          summary: 'Falha',
          detail: 'Erro ao enviar comando'
        });
      });
    }
  }

  cancelar() {
    if(this.dispositivo){
      this.dispositivoService.enviarComandoTemporizado('', this.dispositivo.mac, true).subscribe(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Comando rápido',
          detail: 'Comando foi cancelado'
        });
        this.dispositivo.timer = false;
      }, fail => {
        this.messageService.add({
          severity: 'error',
          summary: 'Falha',
          detail: 'Erro ao cancelar comando'
        });
      });
    }
  }


}
