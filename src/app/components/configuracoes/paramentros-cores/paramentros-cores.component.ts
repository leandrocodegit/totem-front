import { Component, Input, OnInit } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { IconsModule } from '../../../IconsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Role } from 'src/app/model/constantes/role.enum';
import { AuthService } from '../../auth/services/auth.service';
import { Parametro } from '../../models/parametro.model';
import { MatDialogModule } from '@angular/material/dialog';
import { Configuracao } from '../../models/configuracao.model';
import { Tipoconfiguracao } from '../../models/constantes/tipo-configuracao';
import { Efeito } from '../../models/constantes/Efeito';


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
    MqttAppModule,
    MatDialogModule
  ],
  providers: [
    MessageService,
    MqttService,

  ],
  templateUrl: './paramentros-cores.component.html',
  styleUrl: './paramentros-cores.component.scss'
})
export class ParamentrosCoresComponent implements OnInit {

  @Input() parametro?: Parametro;
  @Input() cor!: Cor;
  @Input() dispositivo!: Dispositivo;
  @Input() enviarConfiguracao = {
    value: false
  };
  @Input() exibeSincronizar = false;
  @Input() exibirBotoes = true;
  protected tipoComando = Tipoconfiguracao.LED;

  constructor(
    private readonly mqttSevice: MqttService,
    private readonly dispositivoService: DispositivoService,
    private readonly corService: CorService,
    private readonly messageService: MessageService,
    private readonly comandoService: ComandoService,
    private readonly authService: AuthService,
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
    /*     if (this.dispositivo && this.dispositivo.cor) {
          this.parametro = this.dispositivo.cor;
        } */

    if (!this.parametro)
      this.parametro = new Parametro
    if (!this.parametro.configuracao)
      this.parametro.configuracao = new Configuracao;
    this.initCores();
    // this.mqttSevice.connect();
  }

  contemPino(pino: number) {
    return this.cor.parametros.find(param => param.pino == pino);
  }
  // private readonly authService: AuthService,
  isAutorizado(admin?: boolean) {
    if (admin)
      return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN])
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN, Role.ROLE_AVANCADO]);
  }

  initCores() {
    if (this.parametro) {
      this.parametro.corHexa[0] = this.rgbToHex(
        this.parametro.cor[0],
        this.parametro.cor[1],
        this.parametro.cor[2],
      )
      this.parametro.corHexa[1] = this.rgbToHex(
        this.parametro.cor[3],
        this.parametro.cor[4],
        this.parametro.cor[5],
      );
      this.parametro.corHexa[2] = this.rgbToHex(
        this.parametro.cor[6],
        this.parametro.cor[7],
        this.parametro.cor[8],
      );
    }
  }

  getMinimo() {
    switch (this.parametro && this.parametro.efeito) {
      case 'SINALIZADOR': return 10;
      case 'CONTADOR': return 10;
      case 'GIRATORIO': return 10;
      default: return 1;
    }
  }

  changeCorPrimaria(index: number) {
    if (this.parametro) {
      const parsedHex = this.parametro.corHexa[index].replace('#', '');
      const r = parseInt(parsedHex.substring(0, 2), 16);
      const g = parseInt(parsedHex.substring(2, 4), 16);
      const b = parseInt(parsedHex.substring(4, 6), 16);

      let i = index * 3
      this.parametro.cor[i++] = r;
      this.parametro.cor[i++] = g;
      this.parametro.cor[i++] = b;

      if (index = 0) {

      }

      this.onSliderChange()
    }
  }

  rgbToHex(r: number, g: number, b: number): string {
    const toHex = (color: number) => color.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  habilitarSincronismo() {

    if (this.enviarConfiguracao.value) {
      /*  this.mqttSevice.observe(`device/send/${this.dispositivo.id}`).subscribe((message: any) => {
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

  onSliderChangeReset() {
    this.tipoComando = Tipoconfiguracao.LED_RESTART;
  }

  onSliderChange() {
    /*     if (this.enviarConfiguracao.value) {
          this.mqttSevice.unsafePublish(`device/receive/${this.dispositivo.id}`, `{
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
        this.initCores(); */
  }

  fechar() {
    this.sincronizar();
    this.router.navigate(['/dispositivos']);
  }

  sincronizar() {
    this.comandoService.sincronizarDispositivo(this.dispositivo.id, this.tipoComando).subscribe({
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
    if (this.parametro && !this.contemPino(this.parametro.pino)) {
      if (this.parametro.pino == 0)
        this.parametro.pino = 1;
      this.cor.parametros.push(this.parametro);
    }

    if (this.parametro)
      if (this.parametro?.configuracao.faixa > (this.parametro?.configuracao.leds / 2))
        this.parametro.configuracao.faixa = (this.parametro?.configuracao.leds / 2);

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
    if (this.parametro && this.cor.parametros.length < 4) {
      var pino = 0;
      if (!this.contemPino(1))
        pino = 1;
      else if (!this.contemPino(2))
        pino = 2;
      else if (!this.contemPino(3))
        pino = 3;
      else if (!this.contemPino(4))
        pino = 4;
      if (pino != 0) {
        var copy = JSON.parse(JSON.stringify(this.parametro));
        copy.pino = pino;
        this.cor.parametros.push(copy);
        this.salvar();
        this.parametro = copy;
      }
    }
  }

  conectar() {

  }
}
