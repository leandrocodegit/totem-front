import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaConfiguracoesComponent } from '../../configuracoes/lista-configuracoes/lista-configuracoes.component';
import { ListaAgendaDispositivoComponent } from '../../agendas/lista-agenda-dispositivo/lista-agenda-dispositivo.component';

@Component({
  selector: 'app-tab-configuracoes',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './tab-configuracoes.component.html',
  styleUrl: './tab-configuracoes.component.scss'
})
export class TabConfiguracoesComponent {

}
