import { Component, Input, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { IconsModule } from '../../../IconsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService2 } from '../../../broker/websocket2.service';
import { MatSelectModule } from '@angular/material/select';
import { Cor } from '../../models/cor.model';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatButtonModule } from '@angular/material/button';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CorService } from '../../dispositivos/services/cor.service';
import { CheckboxModule } from 'primeng/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MqttService } from 'ngx-mqtt';
import { MqttAppModule } from 'src/app/mqtt-app.module';
import { ComandoService } from '../../dispositivos/services/comando.service';


@Component({
  selector: 'app-paramentros-cores',
  standalone: true,
  imports: [
    MatSliderModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    NgIf,
    CheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ToastModule,
    MqttAppModule
  ],
  providers: [
    MessageService,
    MqttService,

  ],
  templateUrl: './paramentros-cores.component.html',
  styleUrl: './paramentros-cores.component.scss'
})
export class ParamentrosCoresComponent implements OnInit {

  @Input() cor!: Cor;
  @Input() dispositivo!: Dispositivo;
  @Input() enviarConfiguracao = {
    value: false
  };
  @Input() exibeSincronizar = false;
  @Input() exibirBotoes = true;

  constructor(
    private readonly mqttSevice: MqttService,
    private readonly dispositivoService: DispositivoService,
    private readonly corService: CorService,
    private readonly messageService: MessageService,
    private readonly comandoService: ComandoService,
    private readonly router: Router
  ) {

    comandoService.temporizadorEmit.subscribe(data => {

      if (data) {
        if (data.includes('não') || data.toUpperCase().includes('FALHA')) {
          this.messageService.add({
            severity: 'error',
            summary: 'Sincronização',
            detail: data
          });
        }
        else if (data.includes('ok')) {
          this.messageService.add({
            severity: 'info',
            summary: 'Sincronização',
            detail: 'Comando foi enviado'
          });
        } else if (data.includes('aceito')) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sincronização',
            detail: data
          });

        }
      }
    })
  }

  ngOnInit(): void {
    console.log('Parametros', this.dispositivo);

    if (this.dispositivo && this.dispositivo.cor) {
      this.cor = this.dispositivo.cor;
    }
    this.initCores();
   // this.mqttSevice.connect();
  }

  initCores() {
    this.cor.primaria = this.rgbToHex(
      this.cor.cor[0],
      this.cor.cor[1],
      this.cor.cor[2],
    )
    this.cor.secundaria = this.rgbToHex(
      this.cor.cor[3],
      this.cor.cor[4],
      this.cor.cor[5],
    );
  }

  getMinimo() {
    switch (this.cor.efeito) {
      case 'SINALIZADOR': return 10;
      case 'CONTADOR': return 10;
      case 'GIRATORIO': return 10;
      default: return 1;
    }
  }

  changeCorPrimaria() {
    const parsedHex = this.cor.primaria.replace('#', '');
    const r = parseInt(parsedHex.substring(0, 2), 16);
    const g = parseInt(parsedHex.substring(2, 4), 16);
    const b = parseInt(parsedHex.substring(4, 6), 16);
    this.cor.cor[0] = r;
    this.cor.cor[1] = g;
    this.cor.cor[2] = b;
    this.onSliderChange()
  }

  changeCorSecundaria() {
    const parsedHex = this.cor.secundaria.replace('#', '');
    const r = parseInt(parsedHex.substring(0, 2), 16);
    const g = parseInt(parsedHex.substring(2, 4), 16);
    const b = parseInt(parsedHex.substring(4, 6), 16);
    this.cor.cor[3] = r;
    this.cor.cor[4] = g;
    this.cor.cor[5] = b;
    this.onSliderChange()
  }

  rgbToHex(r: number, g: number, b: number): string {
    const toHex = (color: number) => color.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  habilitarSincronismo() {

    if (this.enviarConfiguracao.value) {
     /*  this.mqttSevice.observe(`device/send/${this.dispositivo.mac}`).subscribe((message: any) => {
        const jsonString = String.fromCharCode(...message.payload);
        const payload = JSON.parse(jsonString);
        if (payload && payload.comando && payload.comando == 'ACEITO') {
          this.messageService.add({
            severity: 'success',
            summary: 'Sincronizado',
            detail: 'Dispositivo sincronizado'
          });
        }
      }); */
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
        "responder": false }
        `);
    }
    this.initCores();
  }

  fechar() {
      this.sincronizar();
      this.router.navigate(['/dispositivos']);
  }

  private sincronizar() {
    this.comandoService.sincronizarDispositivo(this.dispositivo.mac).subscribe({
      next: (data) => {
      },
      complete: () => {
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Falha',
          detail: 'Erro ao enviar comando'
        });
      }
    });
  }

  salvar() {
    this.initCores();
    this.corService.salvarCor(this.cor, false).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Alteração',
        detail: 'Configuração salva com sucesso'
      });
      this.sincronizar();
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao salvar configuração'
      });
    })
  }

  duplicar() {
    this.initCores();
    this.cor.mac = this.dispositivo.mac;
    this.corService.duplicarCor(this.cor).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Duplicação',
        detail: 'Cor duplicada com sucesso'
      });
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao copiar configuração'
      });
    })
  }

  conectar() {

  }
}
