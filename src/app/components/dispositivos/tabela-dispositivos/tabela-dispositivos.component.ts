import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IconsModule } from '../../../IconsModule';
import { Dispositivo } from '../../models/dispositivo.model';
import { NgFor, NgIf } from '@angular/common';
import { Comando, ComandoValue } from '../../models/constantes/comando';
import { EfeitoValue } from '../../models/constantes/Efeito';
import { DispositivoService } from '../services/dispositivo.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Cor } from '../../models/cor.model';
import { FormularioDispositivoComponent } from '../formulario-dispositivo/formulario-dispositivo.component';
import { Filtro } from '../../models/constantes/filtro';
import { Agenda } from '../../models/agenda.model';
import { FormsModule } from '@angular/forms';
import { DetalhesDispositivoComponent } from '../detalhes-dispositivo/detalhes-dispositivo.component';
import { PAGE_INIT } from '../../models/constantes/PageUtil';
import { TesteDispositivoComponent } from '../teste-dispositivo/teste-dispositivo.component';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ListaRapidasComponent } from '../../configuracoes/lista-rapidas/lista-rapidas.component';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ComandoService } from '../services/comando.service';
import { ToastModule } from 'primeng/toast';
var initDialog = true;

@Component({
  selector: 'app-tabela-dispositivos',
  standalone: true,
  imports: [
    IconsModule,
    NgFor, NgIf,
    MatDialogModule,
    CheckboxModule,
    FormsModule,
    NgIf,
    MatPaginatorModule,
    MatSortModule,
    TooltipModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './tabela-dispositivos.component.html',
  styleUrl: './tabela-dispositivos.component.scss'
})
export class TabelaDispositivosComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() dispositivos: Dispositivo[] = [];
  @Input() agenda!: Agenda;
  @Input() exibirAcoes: boolean = true;
  @Input() checkEmit: boolean = false;
  @Input() indexTab = 0;
  @Output() selecionarEmit = new EventEmitter;
  @Output() sortDataEmit = new EventEmitter;

  protected page?: PageEvent;
  private ordenar: any;

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly dialog: MatDialog,
    private readonly messageService: MessageService,
    private readonly comandoService: ComandoService,
    private readonly route: Router
  ) {

    comandoService.temporizadorEmit.subscribe(data => {

      if (data) {
        if (data.includes('não') || data.toUpperCase().includes('FALHA')) {
          this.messageService.add({
            severity: 'error',
            summary: 'Sincronização',
            detail: data
          });
        }
        else if (data.includes('ok')) {
          this.messageService.add({
            severity: 'info',
            summary: 'Sincronização',
            detail: 'Comando foi enviado'
          });
        } else if (data.includes('aceito')) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sincronização',
            detail: data
          });
        }
      }
    })

    dispositivoService.pesquisa.subscribe(data => {
      if (data && data.value) {
        this.pesquisar(data.value);
      }
      else {
        this.carregarLista(PAGE_INIT);
      }
    })
  }

  ngOnInit(): void {
    this.carregarLista(PAGE_INIT)
  }

  ngAfterViewInit(): void {
    if (this.checkEmit) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.ATIVO).subscribe(response => {
        this.dispositivos = response.content;
        this.dispositivos.forEach(it => {
          if (this.agenda.dispositivos.find(device => device?.mac && device.mac === it.mac)) {
            it.selecionado = true;
          }
          else {
            it.selecionado = false;
          }
        })
      });

    }
  }

  pesquisar(value: string) {
    this.dispositivoService.pesquisarDispositivo(value, PAGE_INIT).subscribe(response => {
      this.dispositivos = response.content;
      this.initPage(response);
    });
  }

  sortData(sort: Sort) {
    this.ordenar = sort;
    this.carregarLista(this.page)
  }

  ngOnDestroy(): void {
    initDialog = true;
  }

  getTradutor(comando?: Comando, cor?: Cor) {
    if (comando)
      return ComandoValue[comando];
    else if (cor)
      return EfeitoValue[cor.efeito!];
    return '';
  }

  mudarStatus(dispositivo: Dispositivo) {
    dispositivo.ativo = !dispositivo.ativo;
    this.dispositivoService.mudarStatus(dispositivo.mac).subscribe();
  }

  testar(dispositivo: Dispositivo) {
    if (dispositivo.conexao.status == 'Online')
      this.dialog.open(TesteDispositivoComponent, {
        data: dispositivo
      })
  }

  detalhes(dispositivo: Dispositivo) {
    this.dialog.open(DetalhesDispositivoComponent, {
      data: dispositivo
    })
  }

  editar(dispositivo: Dispositivo) {
    let retorno = this.dialog.open(FormularioDispositivoComponent, {
      data: dispositivo
    })

    retorno.afterClosed().subscribe(() => {
     // this.carregarLista();
    })
  }

  sincronizar(dispositivo: Dispositivo, teste: boolean) {
    try {
      this.comandoService.sincronizarDispositivo(dispositivo.mac).subscribe({
        next: (data) => {
        },
        complete: () => {
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao enviar comando'
          });
        }
      },);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao enviar comando'
      });
    }
  }

  comandoRapido(dispositivo: Dispositivo, teste: boolean) {

    this.route.navigate(['/comandos/' + dispositivo.mac])

    if (dispositivo.conexao.status == 'Onlinea') {
      this.dialog.open(ListaRapidasComponent, {
        data: dispositivo
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Alerta',
        detail: 'Dispositivo não está online'
      });
    }
  }

  configurar(dispositivo: Dispositivo) {
    this.route.navigate(['/dispositivos/configuracoes/' + dispositivo.mac]);
  }

  selecionarDispositivo(dispositivo: Dispositivo) {
    this.selecionarEmit.emit(dispositivo);
  }

  carregarLista(page?: PageEvent) {
    if (this.indexTab == 0) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.ATIVO, this.ordenar, page).subscribe(response => {
        this.dispositivos = response.content;
        this.initPage(response);
      });
    } else if (this.indexTab == 1) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.INATIVO, this.ordenar, page).subscribe(response => {
        this.dispositivos = response.content;
        this.initPage(response);
      });
    } else if (this.indexTab == 2) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.OFFLINE, this.ordenar, page).subscribe(response => {
        this.dispositivos = response.content;
        this.initPage(response);
      });
    } else if (this.indexTab == 3) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.NAO_CONFIGURADO, this.ordenar, page).subscribe(response => {
        this.dispositivos = response.content;
        this.initPage(response);
      });
    }
  }

  private initPage(response: any) {
    this.page = {
      pageIndex: response.page.number,
      length: response.page.totalElements,
      previousPageIndex: 0,
      pageSize: response.page.size
    }
  }

  handlePageEvent(page: PageEvent) {
    this.page = page;
    this.carregarLista(page);
  }


}
