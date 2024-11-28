import { Component } from '@angular/core';
import { IconsModule } from '../../../IconsModule';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { TabelaDispositivosComponent } from '../tabela-dispositivos/tabela-dispositivos.component';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginator } from '../../../util/CustomPaginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CardMapaCordenadasComponent } from '../../mapa/card-mapa-cordenadas/card-mapa-cordenadas.component';
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
    }
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

  constructor(
    private readonly dispositivoService: DispositivoService,
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
