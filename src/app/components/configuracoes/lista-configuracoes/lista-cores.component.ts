import { Component, EventEmitter, Input, OnInit, Output, output, ViewEncapsulation } from '@angular/core';
import { Efeito, EfeitoValue } from '../../models/constantes/Efeito';
import { Comando, ComandoValue } from '../../models/constantes/comando';
import { IconsModule } from '../../../IconsModule';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Cor } from '../../models/cor.model';
import { MatRadioModule } from '@angular/material/radio';
import { CorService } from '../../dispositivos/services/cor.service';
import { MatButtonModule } from '@angular/material/button';
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
import { FormularioCorComponent } from '../formulario-cores/formulario-cores.component';
import { AuthService } from '../../auth/services/auth.service';
import { Role } from 'src/app/model/constantes/role.enum';
import { RouterModule } from '@angular/router';

export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 1000,
  touchendHideDelay: 1000,
};

@Component({
  selector: 'app-lista-cores',
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
    FormsModule,
    RouterModule
  ],
  providers: [
    MessageService,
    { provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults },
    { provide: MatPaginatorIntl, useClass: CustomPaginator }
  ],
  templateUrl: './lista-cores.component.html',
  styleUrl: './lista-cores.component.scss'
})
export class ListaCoresComponent implements OnInit {


  @Input() cores: Cor[] = [];
  @Input() idSelecionado = '';
  @Input() modoAll = true;
  @Output() removerEmit = new EventEmitter;
  @Output() editarEmit = new EventEmitter;
  @Output() principalEmit = new EventEmitter;
  @Output() salvarEmit = new EventEmitter;
  @Input() rapida = false;
  @Input() vibracao = false;
  @Input() exclusiva = false;


  protected alterouPrincipal: boolean = false;
  protected page?: PageEvent;
  protected ordenar: any;


  constructor(
    private readonly corService: CorService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
  ) {
    corService.carregarLista.subscribe(() => this.carregarLista());
  }

  ngOnInit(): void {
    this.carregarLista(PAGE_INIT);
  }

  isAutorizado(admin?: boolean){
    if(admin)
      return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN])
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN, Role.ROLE_AVANCADO]);
   }

  sortData(sort: Sort) {
    this.ordenar = sort;
    this.carregarLista(this.page)
  }

  carregarLista(page?: PageEvent) {
    this.corService.listaTodasConfiguracoes(this.rapida, this.vibracao, this.exclusiva, this.ordenar, page).subscribe(response => {
      this.cores = response.content;
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

  remover(cor: Cor) {
    if (this.modoAll) {
      let retorno = this.dialog.open(ConfirmacaoComponent);
      retorno.afterClosed().subscribe(data => {
        if(data)
        this.corService.removerCor(cor.id).subscribe(() => {
          this.cores = this.cores.filter(conf => conf != cor);
          this.messageService.add({
            severity: 'success',
            summary: 'Removido',
            detail: 'A configuração foi removida!'
          });
        }, fail => {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: fail?.error?.message ? fail?.error?.message : 'Erro ao remover configuração!'
          });
        });
      });
    } else {
      this.removerEmit.emit(cor);
    }
  }

  configurar(cor: Cor) {
    if (this.modoAll) {

    } else {
      this.editarEmit.emit(cor);
    }
  }

  editar(cor: Cor) {
    let retorno = this.dialog.open(FormularioCorComponent, {
      data: cor,
      panelClass: 'box-dialog'
    });

    retorno.afterClosed().subscribe(() => this.carregarLista());
  }

  definirConfiguracao(value: Cor) {
    this.principalEmit.emit(value);
  }

  salvar() {
    if (this.modoAll) {

    } else {
      this.salvarEmit.emit();
    }
  }


}

