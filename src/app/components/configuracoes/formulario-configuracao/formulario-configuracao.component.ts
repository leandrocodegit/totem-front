import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { TabelaDispositivosComponent } from '../../dispositivos/tabela-dispositivos/tabela-dispositivos.component';
import { ConfiguracaoService } from '../../dispositivos/services/configuracao.service';
import { MatCardModule } from '@angular/material/card';
import { Configuracao } from '../../models/configuracao.model';
import { ParamentrosCoresComponent } from '../../dispositivos/paramentros-cores/paramentros-cores.component';

@Component({
  selector: 'app-formulario-configuracao',
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
    ParamentrosCoresComponent
  ],
  templateUrl: './formulario-configuracao.component.html',
  styleUrl: './formulario-configuracao.component.scss'
})
export class FormularioConfiguracaoComponent implements OnInit {


  protected configuracao: Configuracao;

  constructor(
    private readonly configuracaoService: ConfiguracaoService,
    private dialogRef: MatDialogRef<FormularioConfiguracaoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.configuracao = JSON.parse(JSON.stringify(data));
    } else {
      this.configuracao = new Configuracao;
    }
  }

  ngOnInit() {

  }


  fechar() {
    this.dialogRef.close();
  }

  salvar() {
      this.configuracaoService.salvarConfiguracao(this.configuracao, false).subscribe(() => {
      }, fail => {
        console.log('Falha ao salvar');
      });
  }

}
