import { Component } from '@angular/core';
import { ListaCoresComponent } from '../lista-cores.component';
import { MatCardModule } from '@angular/material/card';
import { Cor } from 'src/app/components/models/cor.model';
import { MessageService } from 'primeng/api';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CorService } from 'src/app/components/dispositivos/services/cor.service';
import { MatButtonModule } from '@angular/material/button';
import { FormularioCorComponent } from '../../formulario-cores/formulario-cores.component';

@Component({
  selector: 'app-card-configuracoes',
  standalone: true,
  imports: [
    ListaCoresComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './card-cores.component.html',
  styleUrl: './card-cores.component.scss'
})
export class CardConfiguracoesComponent {

  protected cor: Cor = new Cor;

  constructor(
    private readonly corService: CorService,
    private readonly dialog: MatDialog,
  ) { }

  adicionar(){
    let retorno = this.dialog.open(FormularioCorComponent, {
      data: this.cor,
      panelClass: 'box-dialog'
    });

    retorno.afterClosed().subscribe(() => {
      this.corService.carregarLista.emit();
    });
  }


}
