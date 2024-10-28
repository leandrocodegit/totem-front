import { Component } from '@angular/core';
import { WebSocketService2 } from '../../../broker/websocket2.service';
import { IconsModule } from '../../../IconsModule';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { TabelaDispositivosComponent } from '../tabela-dispositivos/tabela-dispositivos.component';


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

  constructor(private websocketService: WebSocketService2) {}

  ngOnInit() {



  }

  conectar() {


    this.websocketService.connect();
    this.websocketService.publicar("{}")



  }



}
