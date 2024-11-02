import { Component } from '@angular/core';
import { WebSocketService2 } from '../../../broker/websocket2.service';
import { IconsModule } from '../../../IconsModule';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { TabelaDispositivosComponent } from '../tabela-dispositivos/tabela-dispositivos.component';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { Filtro } from '../../models/constantes/filtro';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginator } from '../../../util/CustomPaginator';
import { PAGE_INIT } from '../../models/constantes/PageUtil';
import { Page } from '../../models/Page';

@Component({
  selector: 'app-lista-dispositivos',
  standalone: true,
  imports: [
    IconsModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    TabelaDispositivosComponent,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: MatPaginatorIntl, useClass: CustomPaginator
    },
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
  protected page?: PageEvent;
  protected indexTab = 0;

  constructor(private websocketService: WebSocketService2,
    private readonly dispositivoService: DispositivoService
  ) { }

  ngOnInit() {
    this.carregarLista(PAGE_INIT);
  }

  onTabChange(event: MatTabChangeEvent) {
    this.indexTab = event.index;
    this.carregarLista(this.page);
  }

  carregarLista(page?: PageEvent){
    if (this.indexTab == 0) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.ATIVO, page).subscribe(response => {
        this.dispositivos = response.content;
        this.initPage(response);
      });
    } else if (this.indexTab == 1) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.INATIVO,page).subscribe(response => {
        this.dispositivosInativos = response.content;
        this.initPage(response);
      });
    } else if (this.indexTab == 2) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.OFFLINE, page).subscribe(response => {
        this.dispositivosOffline = response.content;
        this.initPage(response);
      });
    } else if (this.indexTab == 3) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.NAO_CONFIGURADO, page).subscribe(response => {
        this.dispositivosnAssociados = response.content;
        this.initPage(response);
      });
    }
  }

  private initPage(response: Page<Dispositivo>){
    console.log("Init");

    this.page = {
      pageIndex: response.pageable.pageNumber,
      length: response.totalElements,
      previousPageIndex: 0,
      pageSize: response.size
    }
  }

  sincronizar() {
    this.dispositivoService.sincronizar(this.dispositivos.map(device => device.mac), false).subscribe(() => {

    }, fail => {
      console.log('Falha ao sincronizar');

    })
  }

  handlePageEvent(page: PageEvent) {
    this.carregarLista(page);
  }


}
