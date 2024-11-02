import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TabelaDispositivosComponent } from '../../dispositivos/tabela-dispositivos/tabela-dispositivos.component';
import { MatCardModule } from '@angular/material/card';
import { ParamentrosCoresComponent } from '../../dispositivos/paramentros-cores/paramentros-cores.component';
import { Dispositivo } from '../../models/dispositivo.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DispositivoService } from '../services/dispositivo.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-formulario-dispositivo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    ToastModule
  ],
  providers:[
    MessageService
  ],
  templateUrl: './formulario-dispositivo.component.html',
  styleUrl: './formulario-dispositivo.component.scss'
})
export class FormularioDispositivoComponent {

  protected dispositivo!: Dispositivo;

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly messageService: MessageService,
    private dialogRef: MatDialogRef<FormularioDispositivoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.dispositivo = JSON.parse(JSON.stringify(data));
    }
  }

  fechar() {
    this.dialogRef.close();
  }

  salvar() {
    this.dispositivoService.alterarNomeDicpositivo(this.dispositivo).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Alteração',
        detail: 'Dispositivo salvo'
      });
    }, fail =>{
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao salvar dispositivo!'
      });
    });
  }
}
