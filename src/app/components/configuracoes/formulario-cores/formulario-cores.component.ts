import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CorService } from '../../dispositivos/services/cor.service';
import { MatCardModule } from '@angular/material/card';
import { Cor } from '../../models/cor.model';
import { ParamentrosCoresComponent } from '../paramentros-cores/paramentros-cores.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Parametro } from '../../models/parametro.model';

@Component({
  selector: 'app-formulario-cores',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    ParamentrosCoresComponent,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './formulario-cores.component.html',
  styleUrl: './formulario-cores.component.scss'
})
export class FormularioCorComponent {


  protected cor?: Cor;
  protected parametro?: Parametro;

  constructor(
    private readonly corService: CorService,
    private readonly messageService: MessageService,
    private dialogRef: MatDialogRef<FormularioCorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.cor = data.cor;
      this.parametro = data.parametro;
    }
  }

  fechar() {
    this.dialogRef.close();
  }

  salvar() {
    if(this.cor)
      this.corService.salvarCor(this.cor, false).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Adicionado',
          detail: 'Configuração salva'
        });
      }, fail =>{
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao salvar configuração!'
          });
      });
    }

}
