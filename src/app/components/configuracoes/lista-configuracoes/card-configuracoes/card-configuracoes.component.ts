import { Component } from '@angular/core';
import { ListaConfiguracoesComponent } from '../lista-configuracoes.component';
import { MatCardModule } from '@angular/material/card';
import { Configuracao } from 'src/app/components/models/configuracao.model';
import { MessageService } from 'primeng/api';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfiguracaoService } from 'src/app/components/dispositivos/services/configuracao.service';
import { FormularioConfiguracaoComponent } from '../../formulario-configuracao/formulario-configuracao.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card-configuracoes',
  standalone: true,
  imports: [
    ListaConfiguracoesComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './card-configuracoes.component.html',
  styleUrl: './card-configuracoes.component.scss'
})
export class CardConfiguracoesComponent {

  protected configuracao: Configuracao = new Configuracao;

  constructor(
    private readonly configuracaoService: ConfiguracaoService,
    private readonly dialog: MatDialog,
  ) { }

  adicionar(){
    let retorno = this.dialog.open(FormularioConfiguracaoComponent, {
      data: this.configuracao,
      panelClass: 'box-dialog'
    });

    retorno.afterClosed().subscribe(() => {
      this.configuracaoService.carregarLista.emit();
    });
  }


}
