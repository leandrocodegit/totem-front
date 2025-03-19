import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ComandoService } from '../services/comando.service';
import { MqttService } from 'ngx-mqtt';
import { MqttAppModule } from 'src/app/mqtt-app.module';
import { Dispositivo } from '../../models/dispositivo.model';


@Component({
  selector: 'app-teste-dispositivo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    NgIf,
    ToastModule,
    MqttAppModule
  ],
  providers: [
    MessageService,
    MqttService
  ],
  templateUrl: './teste-dispositivo.component.html',
  styleUrl: './teste-dispositivo.component.scss'
})
export class TesteDispositivoComponent implements OnInit {

  protected dispositivo?: Dispositivo;
  protected iniciarTeste = false;
  protected timeRemaining = 2000;
  private isRunning = false;
  protected isBrowser = signal(false);
  private intervalId: any;
  private index = 0;
  protected cores: any[] = [
    { nome: "Vermelho", cor: "red" },
    { nome: "Verde", cor: "#02e802" },
    { nome: "Azul", cor: "#0089f7" },
    { nome: "Ciano", cor: "#00FFFF" },
    { nome: "Magenta", cor: "#FF00FF" },
    { nome: "Amarelo", cor: "yellow" },
    { nome: "Branco", cor: "white" },
    { nome: "Finalizando teste", cor: "white" }
  ];
  protected cor: any;

  constructor(
    private readonly messageService: MessageService,
    private readonly comandoService: ComandoService,
    private readonly mqttSevice: MqttService,

    @Inject(MAT_DIALOG_DATA) private data: any,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser.set(isPlatformBrowser(platformId));
    if (data) {
      this.dispositivo = data;
    }
  }

  ngOnInit(): void {
    this.start();
    this.mqttSevice.observe(`device/send/${this.dispositivo?.id}`).subscribe((message: any) => {
      const jsonString = String.fromCharCode(...message.payload);
      const payload = JSON.parse(jsonString);
      if (payload && payload.comando && payload.comando == 'ACEITO') {
        this.messageService.add({
          severity: 'info',
          summary: 'Teste',
          detail: 'Dispositivo recebeu o teste'
        });
      }
      if (payload && payload.comando && payload.comando == 'CONCLUIDO') {
        this.messageService.add({
          severity: 'success',
          summary: 'Teste',
          detail: 'Dispositivo concluiu o teste'
        });
      }
    });
  }

  testar() {
    this.mqttSevice.unsafePublish(`device/receive/${this.dispositivo?.id}`, `{
      "efeito": "TESTE",
      "cor": [${this.dispositivo?.cor.cor}],
      "leds": ${this.dispositivo?.configuracao.leds},
      "faixa": ${this.dispositivo?.configuracao.faixa},
      "intensidade": ${this.dispositivo?.configuracao.intensidade},
      "correcao": [${this.dispositivo?.cor.correcao}],
      "velocidade":${this.dispositivo?.cor.velocidade},
      "host": "",
      "responder": true }
      `);
    this.start();
  }

  start() {


    this.cor = this.cores[this.index];
    if (!this.isRunning && this.isBrowser()) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        if (this.cor.nome != this.cores[this.cores.length - 1].nome) {
          this.index++;
          this.cor = this.cores[this.index];
        } else {
          this.stop();
        }
      }, 2250);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      this.iniciarTeste = false;
      this.index = 0;
      clearInterval(this.intervalId);
    }
  }

}
