import { Component, EventEmitter, Input, OnInit, Output, output, ViewEncapsulation } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { Efeito, EfeitoValue } from '../../models/constantes/Efeito';
import { ActivatedRoute, Router } from '@angular/router';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { Comando, ComandoValue } from '../../models/constantes/comando';
import { IconsModule } from '../../../IconsModule';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Configuracao } from '../../models/configuracao.model';
import { MatRadioModule } from '@angular/material/radio';
import { ConfiguracaoService } from '../../dispositivos/services/configuracao.service';
import { MatButtonModule } from '@angular/material/button';
import { FormularioConfiguracaoComponent } from '../formulario-configuracao/formulario-configuracao.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions } from '@angular/material/tooltip';
import { PAGE_INIT } from '../../models/constantes/PageUtil';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginator } from '../../../util/CustomPaginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { ConfirmacaoComponent } from '../../util/confirmacao/confirmacao.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-lista-configuracoes',
  standalone: true,
  imports: [
    IconsModule,
    NgFor, NgIf,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    ToastModule,
    MatPaginatorModule,
    MatSortModule,
    CheckboxModule,
    FormsModule
  ],
  providers: [
    MessageService,
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ],
  templateUrl: './lista-configuracoes.component.html',
  styleUrl: './lista-configuracoes.component.scss'
})
export class ListaConfiguracoesComponent implements OnInit {


  @Input() configuracoes: Configuracao[] = [];
  @Input() idSelecionado = '';
  @Input() modoAll = true;
  @Output() removerEmit = new EventEmitter;
  @Output() editarEmit = new EventEmitter;
  @Output() principalEmit = new EventEmitter;
  @Output() salvarEmit = new EventEmitter;

  protected alterouPrincipal: boolean = false;
  protected page?: PageEvent;
  protected ordenar: any;


  constructor(
    private readonly configuracaoService: ConfiguracaoService,
    private readonly messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly dialog: MatDialog,
  ) {
    configuracaoService.carregarLista.subscribe(() => this.carregarLista());
  }

  ngOnInit(): void {
    this.carregarLista(PAGE_INIT)
  }

  sortData(sort: Sort) {
    this.ordenar = sort;
    this.carregarLista(this.page)
  }

  carregarLista(page?: PageEvent) {
    this.configuracaoService.listaTodasConfiguracoes(this.ordenar, page).subscribe(response => {
      this.configuracoes = response.content;
      this.initPage(response);
    });
  }

  handlePageEvent(page: PageEvent) {
    this.carregarLista(page);
  }

  private initPage(response: any) {
    this.page = {
      pageIndex: response.page.number,
      length: response.page.totalElements,
      previousPageIndex: 0,
      pageSize: response.page.size
    }
  }

  getTradutor(comando?: Comando, efeito?: Efeito) {
    if (comando)
      return ComandoValue[comando];
    else if (efeito)
      return EfeitoValue[efeito];
    return '';
  }

  remover(configuracao: Configuracao) {
    if (this.modoAll) {
      let retorno = this.dialog.open(ConfirmacaoComponent);
      retorno.afterClosed().subscribe(data => {
        if(data)
        this.configuracaoService.removerConfiguracao(configuracao.id).subscribe(() => {
          this.configuracoes = this.configuracoes.filter(conf => conf != configuracao);
          this.messageService.add({
            severity: 'success',
            summary: 'Removido',
            detail: 'A configuração foi removida!'
          });
        }, fail => {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao remover configuração!'
          });
        });
      });
    } else {
      this.removerEmit.emit(configuracao);
    }
  }

  configurar(configuracao: Configuracao) {
    if (this.modoAll) {

    } else {
      this.editarEmit.emit(configuracao);
    }
  }

  editar(configuracao: Configuracao) {
    let retorno = this.dialog.open(FormularioConfiguracaoComponent, {
      data: configuracao,
      panelClass: 'box-dialog'
    });

    retorno.afterClosed().subscribe(() => this.carregarLista());
  }

  definirConfiguracao(value: Configuracao) {
    this.principalEmit.emit(value);
  }

  salvar() {
    if (this.modoAll) {

    } else {
      this.salvarEmit.emit();
    }
  }


}

