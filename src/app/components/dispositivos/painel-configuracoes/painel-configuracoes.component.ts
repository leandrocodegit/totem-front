import { Component, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { IconsModule } from '../../../IconsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService2 } from '../../../broker/websocket2.service';
import { MatSelectModule } from '@angular/material/select';
import { Cor } from '../../models/cor.model';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatButtonModule } from '@angular/material/button';
import { DispositivoService } from '../services/dispositivo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ParamentrosCoresComponent } from '../../configuracoes/paramentros-cores/paramentros-cores.component';
import { MatCardModule } from '@angular/material/card';
import { TabConfiguracoesComponent } from '../tab-configuracoes/tab-configuracoes.component';
import { ListaAgendaDispositivoComponent } from '../../agendas/lista-agenda-dispositivo/lista-agenda-dispositivo.component';
import { ListaCoresDispositivoComponent } from '../lista-cores-dispositivo/lista-cores-dispositivo.component';
import { NgIf } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    ListaCoresDispositivoComponent,
    NgIf,
    CheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './painel-configuracoes.component.html',
  styleUrl: './painel-configuracoes.component.scss'
})
export class PainelConfiguracoesComponent implements OnInit {

  protected dispositivo!: Dispositivo;
  protected tabSelect = 0;

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly messageService: MessageService,
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
          else if (!this.dispositivo.cor){
            this.tabSelect = 1;
          }
        })
      }

    })
  }

  salvarConfiguracao(){
    this.dispositivoService.salvarConfiguracao(this.dispositivo).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Alteração',
        detail: 'Configuração salva com sucesso'
      });
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao salvar configuração'
      });
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log('Change tab', this.dispositivo);
  }
}
