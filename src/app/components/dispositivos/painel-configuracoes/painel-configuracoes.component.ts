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
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { ParamentrosCoresComponent } from '../paramentros-cores/paramentros-cores.component';
import { MatCardModule } from '@angular/material/card';


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
    MatCardModule
  ],
  templateUrl: './painel-configuracoes.component.html',
  styleUrl: './painel-configuracoes.component.scss'
})
export class PainelConfiguracoesComponent implements OnInit {

  protected dispositivo!: Dispositivo;

  constructor(
    private readonly dispositivoService: DispositivoService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.route.params?.subscribe(params => {
      if (params['mac'] != undefined) {
        this.dispositivoService.buscarDicpositivo(params['mac']).subscribe(response => {
          this.dispositivo = response;
          this.dispositivoService.dispositivoEdit.emit(this.dispositivo)
        })
      }
    })
  }
}
