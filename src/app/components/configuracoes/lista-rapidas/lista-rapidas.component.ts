import { Component, Inject, Input, OnInit } from '@angular/core';
import { Cor } from '../../models/cor.model';
import { CorService } from '../../dispositivos/services/cor.service';
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

  @Input() cores: Cor[] = [];
  @Input() dispositivo: Dispositivo;

  constructor(
    private readonly corService: CorService,
    private readonly dispositivoService: DispositivoService,
    private readonly messageService: MessageService,
    private dialogRef: MatDialogRef<ListaRapidasComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {

    this.dispositivo = data;
  }

  ngOnInit(): void {

    this.corService.listaTodasCoresRapidas().subscribe(response => this.cores = response)
  }

  enviar(cor: Cor) {
    if(this.dispositivo){
      this.dispositivoService.enviarComandoTemporizado(cor.id, this.dispositivo.mac, false).subscribe(() => {
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
