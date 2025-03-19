import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ListaParametrosComponent } from '../../configuracoes/lista-parametros/lista-parametros.component';
import { InformacoesDispositivoComponent } from '../informacoes-dispositivo/informacoes-dispositivo.component';

@Component({
  selector: 'app-detalhes-dispositivo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    InformacoesDispositivoComponent,
    ListaParametrosComponent
  ],
  templateUrl: './detalhes-dispositivo.component.html',
  styleUrl: './detalhes-dispositivo.component.scss'
})
export class DetalhesDispositivoComponent {

  protected dispositivo?: Dispositivo;

  constructor(
    private readonly dialogRef: MatDialogRef<DetalhesDispositivoComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private readonly data: any
  ) {
    if (data) {
      this.dispositivo = data;
    }
  }

  getCor(dispositivo?: Dispositivo){
    if(!dispositivo)
      return undefined;
    if(dispositivo.operacao.modoOperacao == 'TEMPORIZADOR')
      return dispositivo.operacao.corTemporizador;
    else if(dispositivo.operacao.modoOperacao == 'AGENDA')
      return dispositivo.operacao.agenda.cor;
    return dispositivo.cor;
  }

}
