import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { IconsModule } from '../../../IconsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService2 } from '../../../broker/websocket2.service';
import { MatSelectModule } from '@angular/material/select';
import { Configuracao } from '../../models/configuracao.model';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatButtonModule } from '@angular/material/button';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ParamentrosCoresComponent } from '../paramentros-cores/paramentros-cores.component';
import { MatCardModule } from '@angular/material/card';
import { TabConfiguracoesComponent } from '../tab-configuracoes/tab-configuracoes.component';
import { ListaAgendaDispositivoComponent } from '../../agendas/lista-agenda-dispositivo/lista-agenda-dispositivo.component';
import { ListaConfiguracoesDispositivoComponent } from '../lista-configuracoes-dispositivo/lista-configuracoes-dispositivo.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-painel-configuracoes',
  standalone: true,
  imports: [
    MatSliderModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    ParamentrosCoresComponent,
    MatCardModule,
    RouterModule,
    TabConfiguracoesComponent,
    ListaAgendaDispositivoComponent,
    ListaConfiguracoesDispositivoComponent,
    NgIf
  ],
  templateUrl: './painel-configuracoes.component.html',
  styleUrl: './painel-configuracoes.component.scss'
})
export class PainelConfiguracoesComponent implements OnInit {

  protected dispositivo!: Dispositivo;
  protected tabSelect = 0;

  constructor(
    private readonly dispositivoService: DispositivoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
   // this.tabSelect = tabSelect;
  }
  ngOnInit(): void {
    this.route.params?.subscribe(params => {
      if (params['mac'] != undefined) {
        this.dispositivoService.buscarDicpositivo(params['mac']).subscribe(response => {
          this.dispositivo = response;
          if (params['tab'] != undefined){
            this.tabSelect = params['tab'];
            this.router.navigate([`/dispositivos/configuracoes/${this.dispositivo.mac}`]);
          }
          else if (!this.dispositivo.configuracao){
            this.tabSelect = 1;
          }
        })
      }

    })
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log('Change tab', this.dispositivo);
  }
}
