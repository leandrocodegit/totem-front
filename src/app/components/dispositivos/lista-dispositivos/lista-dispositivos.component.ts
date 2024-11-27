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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { FormularioDispositivoComponent } from '../formulario-dispositivo/formulario-dispositivo.component';
import { MatDialog } from '@angular/material/dialog';
import { CardMapaCordenadasComponent } from '../../mapa/card-mapa-cordenadas/card-mapa-cordenadas.component';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-lista-dispositivos',
  standalone: true,
  imports: [
    NgIf,
    IconsModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    TabelaDispositivosComponent,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
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
  protected nomeFind = new Subject<any>();
  protected edicao = false;

  constructor(private readonly websocketService: WebSocketService2,
    private readonly dispositivoService: DispositivoService,
    private readonly activeRoute: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {
    this.nomeFind
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(value => {
          if (value != undefined && value.length > 2) {
            this.dispositivoService.pesquisa.emit({ value: value });
            return of(value);
          } else if (!value) {
            this.dispositivoService.pesquisa.emit(false);
            return of(null);
          }
          return of(null);
        })
      )
      .subscribe();

  }

  pesquisar(value: string){
    this.dispositivoService.pesquisa.emit({ value: value });
  }

  mapa() {
    this.dialog.open(CardMapaCordenadasComponent, {
      panelClass: 'no-overflow'
    })
  }

  onTabChange(event: MatTabChangeEvent) {
    console.log(event);

    this.dispositivoService.tabSelect.emit({
      tab: event.index
    });
  }


  sincronizar() {
    this.dispositivoService.sincronizar(this.dispositivos.map(device => device.mac), false).subscribe(() => {
    }, fail => {
      console.log('Falha ao sincronizar');
    })
  }
}
