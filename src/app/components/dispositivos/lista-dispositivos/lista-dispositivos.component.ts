import { Component } from '@angular/core';
import { WebSocketService2 } from '../../../broker/websocket2.service';

@Component({
  selector: 'app-lista-dispositivos',
  standalone: true,
  imports: [

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
    this.websocketService.connect()



  }



}
