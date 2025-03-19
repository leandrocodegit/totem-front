import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../../models/dispositivo.model';
import { DispositivoService } from '../services/dispositivo.service';
import { MqttService } from 'ngx-mqtt';
import { InformacoesDispositivoComponent } from '../informacoes-dispositivo/informacoes-dispositivo.component';
import { MqttAppModule } from 'src/app/mqtt-app.module';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [
    InformacoesDispositivoComponent,
    MatIconModule,
    MqttAppModule,
    NgFor
  ],
  providers: [
    MqttService,
  ],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss'
})
export class DebugComponent implements OnInit {

  protected dispositivo?: Dispositivo;
  protected mensagens: string[] = [];

  constructor(
    private readonly mqttSevice: MqttService,
    private readonly activeRoute: ActivatedRoute,
    private readonly dispositivoService: DispositivoService
  ) { }

  ngOnInit(): void {

    this.activeRoute.params?.subscribe(params => {
      if (params['id'] != undefined) {
        this.dispositivoService.buscarDicpositivo(params['id']).subscribe(response => {
          this.dispositivo = response;
          if(this.dispositivo.conexao.tipoConexao != 'LORA')
            this.initDebug();
        })

      }
    })


  }

  private initDebug() {
    if (this.dispositivo) {
      this.mqttSevice.publish(`device/receive/${this.dispositivo.id}`, '040C0104').subscribe(() => {});
      this.mqttSevice.observe(`device/debug/${this.dispositivo.id}`).subscribe((message: any) => {
        const decoder = new TextDecoder("utf-8");
        const jsonString = decoder.decode(message.payload);
        this.mensagens.push(jsonString);

        if(this.dispositivo && jsonString.includes('Status')){
          this.dispositivoService.buscarDicpositivo(this.dispositivo?.id).subscribe(response => {
            this.dispositivo = response;
          })
        }
      });
    }
  }
}
