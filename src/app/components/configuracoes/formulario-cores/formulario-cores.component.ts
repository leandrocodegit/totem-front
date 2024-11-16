import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { TabelaDispositivosComponent } from '../../dispositivos/tabela-dispositivos/tabela-dispositivos.component';
import { CorService } from '../../dispositivos/services/cor.service';
import { MatCardModule } from '@angular/material/card';
import { Cor } from '../../models/cor.model';
import { ParamentrosCoresComponent } from '../paramentros-cores/paramentros-cores.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    TabelaDispositivosComponent,
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
export class FormularioCorComponent implements OnInit {


  protected cor: Cor;

  constructor(
    private readonly corService: CorService,
    private readonly messageService: MessageService,
    private dialogRef: MatDialogRef<FormularioCorComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.cor = JSON.parse(JSON.stringify(data));
    } else {
      this.cor = new Cor;
    }
  }

  ngOnInit() {

  }


  fechar() {
    this.dialogRef.close();
  }

  salvar() {
    console.log("salvar configuração");

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
