import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
import { ListaAgendaDispositivoComponent } from '../../agendas/lista-agenda-dispositivo/lista-agenda-dispositivo.component';
import { ListaCoresDispositivoComponent } from '../lista-cores-dispositivo/lista-cores-dispositivo.component';
import { NgIf } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MqttService } from 'ngx-mqtt';
import { MqttAppModule } from 'src/app/mqtt-app.module';

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
    ListaAgendaDispositivoComponent,
    ListaCoresDispositivoComponent,
    NgIf,
    CheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    ToastModule,
    MqttAppModule
  ],
  providers: [
    MessageService,
    MqttService
  ],
  templateUrl: './painel-configuracoes.component.html',
  styleUrl: './painel-configuracoes.component.scss'
})
export class PainelConfiguracoesComponent implements OnInit, OnDestroy {

  protected dispositivo!: Dispositivo;
  protected tabSelect = 0;
  @Input() enviarConfiguracao = {
    value: false
  };

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly messageService: MessageService,
    private readonly mqttSevice: MqttService,
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
          if(!this.dispositivo.configuracao){
            this.dispositivo.configuracao = {
              intensidade: 255,
              leds: 1,
              faixa: 2,
              tipoCor: 'RGB'
            }
          }
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

  ngOnDestroy(): void {
    this.mqttSevice.disconnect();
    console.log('Disconnect', this.mqttSevice.onConnect);

  }

  habilitarSincronismo() {
    if (this.enviarConfiguracao.value) {
      this.mqttSevice.observe(`device/send/${this.dispositivo.mac}`).subscribe((message: any) => {
        const jsonString = String.fromCharCode(...message.payload);
        const payload = JSON.parse(jsonString);
        if (payload && payload.comando && payload.comando == 'ACEITO') {
          this.messageService.add({
            severity: 'success',
            summary: 'Sincronizado',
            detail: 'Dispositivo sincronizado'
          });
        }
      });
    }
  }

  onSliderChange() {
    if (this.enviarConfiguracao.value) {
      this.mqttSevice.unsafePublish(`device/receive/${this.dispositivo.mac}`, `{
        "efeito": "${this.dispositivo.cor.efeito}",
        "cor": [${this.dispositivoService.formatCor(this.dispositivo.cor.cor, this.dispositivo.configuracao.tipoCor)}],
        "leds": ${this.dispositivo.configuracao.leds},
        "faixa": ${this.dispositivo.configuracao.faixa},
        "intensidade": ${this.dispositivo.configuracao.intensidade},
        "correcao": [${this.dispositivoService.formatCorrecao(this.dispositivo.cor.correcao, this.dispositivo.configuracao.tipoCor)}],
        "velocidade":${this.dispositivo.cor.velocidade},
        "host": "",
        "responder": true }
        `);
    }
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
