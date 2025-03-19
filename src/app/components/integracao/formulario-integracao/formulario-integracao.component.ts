import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { IconsModule } from 'src/app/IconsModule';
import { IntegracaoService } from '../../dispositivos/services/integracao.service';
import { Integracao } from '../../models/integracao.model';

@Component({
  selector: 'app-formulario-integracao-cliente',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    ToastModule,
    IconsModule,
    MatDialogModule,
  ],
  providers: [
    MessageService
  ],
  templateUrl: './formulario-integracao.component.html',
  styleUrl: './formulario-integracao.component.scss'
})
export class FormularioIntegracaoComponent {

  protected integracaco: Integracao = new Integracao();

  constructor(
    private readonly integracaoService: IntegracaoService,
    private readonly messageService: MessageService,
  ) {}

  criarIntegracao(){
    this.integracaoService.criarIntegracao(this.integracaco).subscribe(response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: "Chave foi criada"
      });
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: fail.error.message
      });
    });
  }
}
