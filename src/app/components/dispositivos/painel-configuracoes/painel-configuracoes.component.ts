import { Component, OnInit } from '@angular/core';
import { MatSliderChange, MatSliderModule } from '@angular/material/slider';
import { IconsModule } from '../../../IconsModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebSocketService2 } from '../../../broker/websocket2.service';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-painel-configuracoes',
  standalone: true,
  imports: [
    MatSliderModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './painel-configuracoes.component.html',
  styleUrl: './painel-configuracoes.component.scss'
})
export class PainelConfiguracoesComponent implements OnInit {

  protected primaria: any;
  protected secundaria: any;
  protected configuracao: any = {
    efeito: "COLORIDO",
    primaria: {
      red: 0,
      green: 0,
      blue: 255
    },
    secundaria: {
      red: 255,
      green: 0,
      blue: 0
    },
    correcao: {
      red: 255,
      green: 255,
      blue: 255
    },
    velocidade: 100,
    intensidade: 255,
    leds: 14,
    faixa: 2,
  }


  constructor(private websocketService: WebSocketService2) { }

  ngOnInit(): void {
    this.primaria = this.rgbToHex(
      this.configuracao.primaria.red,
      this.configuracao.primaria.green,
      this.configuracao.primaria.blue,
    )
    this.secundaria = this.rgbToHex(
      this.configuracao.secundaria.red,
      this.configuracao.secundaria.green,
      this.configuracao.secundaria.blue,
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
    const parsedHex = this.primaria.replace('#', '');
    const r = parseInt(parsedHex.substring(0, 2), 16);
    const g = parseInt(parsedHex.substring(2, 4), 16);
    const b = parseInt(parsedHex.substring(4, 6), 16);
    this.configuracao.primaria.red = r;
    this.configuracao.primaria.green = g;
    this.configuracao.primaria.blue = b;
    this.onSliderChange()
  }

  changeCorSecundaria() {
    const parsedHex = this.secundaria.replace('#', '');
    const r = parseInt(parsedHex.substring(0, 2), 16);
    const g = parseInt(parsedHex.substring(2, 4), 16);
    const b = parseInt(parsedHex.substring(4, 6), 16);
    this.configuracao.secundaria.red = r;
    this.configuracao.secundaria.green = g;
    this.configuracao.secundaria.blue = b;
    this.onSliderChange()
  }

  rgbToHex(r: number, g: number, b: number): string {
    const toHex = (color: number) => color.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  onSliderChange() {

    var obejto = {
      configuracao: {
        efeito: this.configuracao.efeito,
        mac: 'EC:62:60:55:99:FC',
        leds: this.configuracao.leds,
        faixa: this.configuracao.faixa,
        cor: [
          this.configuracao.primaria.red,
          this.configuracao.primaria.green,
          this.configuracao.primaria.blue,
          this.configuracao.secundaria.red,
          this.configuracao.secundaria.green,
          this.configuracao.secundaria.blue
        ],
        correcao: [
          this.configuracao.correcao.red,
          this.configuracao.correcao.green,
          this.configuracao.correcao.blue
        ],
        velocidade: this.configuracao.velocidade,
        intensidade: this.configuracao.intensidade
      },
      devices: [
        "EC:62:60:55:99:FC",
        "C8:2E:18:25:C5:DC",
        "C4:DE:E2:5B:7B:1C"
      ]
    }
    console.log(obejto);

    this.websocketService.publicar(JSON.stringify(obejto))

    this.primaria = this.rgbToHex(
      this.configuracao.primaria.red,
      this.configuracao.primaria.green,
      this.configuracao.primaria.blue,
    );
    this.secundaria = this.rgbToHex(
      this.configuracao.secundaria.red,
      this.configuracao.secundaria.green,
      this.configuracao.secundaria.blue,
    );

  }

}


interface Cor {
  red: number,
  green: number,
  blue: number
}
