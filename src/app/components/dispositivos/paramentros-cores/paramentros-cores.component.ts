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
    NgIf
  ],
  templateUrl: './paramentros-cores.component.html',
  styleUrl: './paramentros-cores.component.scss'
})
export class ParamentrosCoresComponent {

  protected primaria: any;
  protected secundaria: any;
  protected configuracao!: Configuracao;
  @Input() dispositivo!: Dispositivo;

  constructor(
    private websocketService: WebSocketService2,
    private readonly dispositivoService: DispositivoService,
    private readonly router: Router
  ) {

    dispositivoService.dispositivoEdit.subscribe(data => {
      if(data){
        this.dispositivo = data;
        this.configuracao = this.dispositivo.configuracao;
        this.initCores();
      }
    })

  }
  ngOnInit(): void {
 
  }

  initCores() {
    this.primaria = this.rgbToHex(
      this.configuracao.cor[0],
      this.configuracao.cor[1],
      this.configuracao.cor[2],
    )
    this.secundaria = this.rgbToHex(
      this.configuracao.cor[3],
      this.configuracao.cor[4],
      this.configuracao.cor[0],
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
    this.configuracao.cor[0] = r;
    this.configuracao.cor[1] = g;
    this.configuracao.cor[2] = b;
    this.onSliderChange()
  }

  changeCorSecundaria() {
    const parsedHex = this.secundaria.replace('#', '');
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
    this.websocketService.publicar(JSON.stringify({
      configuracao: this.configuracao,
      device: this.dispositivo.mac
    }))
    this.initCores();
  }

  fechar() {
    this.dispositivoService.sincronizar([this.dispositivo.mac]).subscribe();
    this.router.navigate(['/dispositivos']);
  }

  salvar() {
    this.router.navigate(['/dispositivos']);
  }
}
