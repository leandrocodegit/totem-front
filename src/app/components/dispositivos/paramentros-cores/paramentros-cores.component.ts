import { Component, Input } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { IconsModule } from '../../../IconsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService2 } from '../../../broker/websocket2.service';
import { MatSelectModule } from '@angular/material/select';
import { Configuracao } from '../../models/configuracao.model';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatButtonModule } from '@angular/material/button';
import { DispositivoService } from '../services/dispositivo.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ConfiguracaoService } from '../services/configuracao.service';
import { CheckboxModule } from 'primeng/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


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
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './paramentros-cores.component.html',
  styleUrl: './paramentros-cores.component.scss'
})
export class ParamentrosCoresComponent {

  @Input() configuracao!: Configuracao;
  @Input() dispositivo!: Dispositivo;
  @Input() enviarConfiguracao = false;
  @Input() exibeSincronizar = false;
  @Input() exibirBotoes = true;

  constructor(
    private websocketService: WebSocketService2,
    private readonly dispositivoService: DispositivoService,
    private readonly configuracaoService: ConfiguracaoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('Parametros', this.dispositivo);

    if (this.dispositivo && this.dispositivo.configuracao) {
      this.configuracao = this.dispositivo.configuracao;
      this.initCores();
    }
  }

  initCores() {
    this.configuracao.primaria = this.rgbToHex(
      this.configuracao.cor[0],
      this.configuracao.cor[1],
      this.configuracao.cor[2],
    )
    this.configuracao.secundaria = this.rgbToHex(
      this.configuracao.cor[3],
      this.configuracao.cor[4],
      this.configuracao.cor[5],
    );
  }

  getMinimo() {
    switch (this.configuracao.efeito) {
      case 'SINALIZADOR': return 10;
      case 'CONTADOR': return 10;
      case 'GIRATORIO': return 10;
      default: return 1;
    }
  }

  changeCorPrimaria() {
    const parsedHex = this.configuracao.primaria.replace('#', '');
    const r = parseInt(parsedHex.substring(0, 2), 16);
    const g = parseInt(parsedHex.substring(2, 4), 16);
    const b = parseInt(parsedHex.substring(4, 6), 16);
    this.configuracao.cor[0] = r;
    this.configuracao.cor[1] = g;
    this.configuracao.cor[2] = b;
    this.onSliderChange()
  }

  changeCorSecundaria() {
    const parsedHex = this.configuracao.secundaria.replace('#', '');
    const r = parseInt(parsedHex.substring(0, 2), 16);
    const g = parseInt(parsedHex.substring(2, 4), 16);
    const b = parseInt(parsedHex.substring(4, 6), 16);
    this.configuracao.cor[3] = r;
    this.configuracao.cor[4] = g;
    this.configuracao.cor[5] = b;
    this.onSliderChange()
  }

  rgbToHex(r: number, g: number, b: number): string {
    const toHex = (color: number) => color.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  onSliderChange() {
    if (this.enviarConfiguracao) {
      console.log({
        configuracao: this.configuracao,
        device: this.dispositivo.mac
      });

      this.websocketService.publicar(JSON.stringify({
        configuracao: this.configuracao,
        device: this.dispositivo.mac
      }))
    }
    this.initCores();
  }

  fechar() {
    console.log(this.enviarConfiguracao);

    if (this.enviarConfiguracao) {
      this.dispositivoService.sincronizar([this.dispositivo.mac], false).subscribe(() => {
      }, fail => {
        console.log('Falha ao enviar dados');
      });
    }
    this.router.navigate(['/dispositivos']);
  }

  salvar() {
    this.initCores();
    this.configuracaoService.salvarConfiguracao(this.configuracao, false).subscribe(() => {
    }, fail => {
      console.log('Falha ao salvar');
    });
  }

  duplicar() {
    this.initCores();
    this.configuracao.mac = this.dispositivo.mac;
    this.configuracaoService.duplicarConfiguracao(this.configuracao).subscribe(() => {
    }, fail => {
      console.log('Falha ao salvar');
    });
  }
}
