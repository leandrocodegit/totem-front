import { Component } from '@angular/core';
import { WebSocketService2 } from '../../../broker/websocket2.service';
import { IconsModule } from '../../../IconsModule';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { TabelaDispositivosComponent } from '../tabela-dispositivos/tabela-dispositivos.component';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { response } from 'express';


@Component({
  selector: 'app-lista-dispositivos',
  standalone: true,
  imports: [
    IconsModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    TabelaDispositivosComponent
  ],
  providers: [
    WebSocketService2
  ],
  templateUrl: './lista-dispositivos.component.html',
  styleUrl: './lista-dispositivos.component.scss'
})
export class ListaDispositivosComponent {

  protected dispositivos: Dispositivo[] = [];
  protected dispositivosOffline: Dispositivo[] = [];
  protected dispositivosInativos: Dispositivo[] = [];
  protected dispositivosnAssociados: Dispositivo[] = [];

  constructor(private websocketService: WebSocketService2,
    private readonly dispositivoService: DispositivoService
  ) {}

  ngOnInit() {

    this.dispositivoService.listaTodosDispositivosAtivo(true).subscribe(response => this.dispositivos = response);

  }

  onTabChange(event: MatTabChangeEvent) {
    if(event.index == 0){
      this.dispositivoService.listaTodosDispositivosAtivo(true).subscribe(response => this.dispositivos = response);
    }else if(event.index == 1){
      this.dispositivoService.listaTodosDispositivosAtivo(false).subscribe(response => this.dispositivosInativos = response);
    }else if(event.index == 2){
      this.dispositivoService.listaTodosDispositivosOffline().subscribe(response => this.dispositivosOffline = response);
    }
  }

  conectar() {


    this.websocketService.connect();
    this.websocketService.publicar("{}")



  }



}
