import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { ComandoService } from '../../dispositivos/services/comando.service';
import { environment } from 'src/environments/environment.prod';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sicronizar-dipositivos',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './sicronizar-dipositivos.component.html',
  styleUrl: './sicronizar-dipositivos.component.scss'
})
export class SicronizarDipositivosComponent {

  protected logs: any[] = [];
  protected isLoad = false;
  protected emiter = new EventEmitter;

  constructor(
    private readonly comandoService: ComandoService,
    private readonly messageService: MessageService
  ) {
  }

  publicarMensagem(mensage: string) {

  }

  getLogs() {
    return this.logs;
  }

  sincronizar(responder: boolean) {
    this.isLoad = true;
    this.logs = [];

    this.comandoService.sincronizar(responder, this.logs
    ).subscribe({
      next: (data) => {
        console.log('Dados recebidos:', data);
      },
      complete: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sincronização',
          detail: 'Envio concluido'
        });
        this.isLoad = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Sincronização',
          detail: 'Erro ao processar envio'
        });
        this.isLoad = false;
      }
    });
  }

}
