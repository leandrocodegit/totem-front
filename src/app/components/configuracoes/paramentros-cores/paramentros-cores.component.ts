import { Component, Input } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


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
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './paramentros-cores.component.html',
  styleUrl: './paramentros-cores.component.scss'
})
export class ParamentrosCoresComponent {

  @Input() cor!: Cor;
  @Input() dispositivo!: Dispositivo;
  @Input() enviarConfiguracao = false;
  @Input() exibeSincronizar = false;
  @Input() exibirBotoes = true;

  constructor(
    private websocketService: WebSocketService2,
    private readonly dispositivoService: DispositivoService,
    private readonly corService: CorService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('Parametros', this.dispositivo);

    if (this.dispositivo && this.dispositivo.cor) {
      this.cor = this.dispositivo.cor;
    }
    this.initCores();
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

  onSliderChange() {
    if (this.enviarConfiguracao) {
      console.log({
        configuracao: this.cor,
        device: this.dispositivo.mac
      });

      this.websocketService.publicar(JSON.stringify({
        configuracao: this.cor,
        device: this.dispositivo.mac
      }))
    }
    this.initCores();
  }

  fechar() {
    if (this.enviarConfiguracao) {
      this.sincronizar();
    }
    this.router.navigate(['/dispositivos']);
  }

  private sincronizar(){
    this.dispositivoService.sincronizar([this.dispositivo.mac], false).subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Sincronizado',
        detail: 'Comando sincronização enviado'
      });
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao enviar comando sincronização'
      });
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
    } )
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
    } )
  }
}
