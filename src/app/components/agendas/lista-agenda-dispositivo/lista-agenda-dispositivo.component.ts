import { Component } from '@angular/core';
import { AgendaService } from '../../dispositivos/services/agenda.service';
import { Router } from '@angular/router';
import { Agenda } from '../../models/agenda.model';
import { Efeito, EfeitoValue } from '../../models/constantes/Efeito';
import { IconsModule } from '../../../IconsModule';
import { DatePipe, NgFor } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FormularioAgendaComponent } from '../formulario-agenda/formulario-agenda.component';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginator } from '../../../util/CustomPaginator';
import { PAGE_INIT } from '../../models/constantes/PageUtil';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MatSortModule, Sort } from '@angular/material/sort';
import { ProximasAgendasComponent } from '../proximas-agendas/proximas-agendas.component';
import { ConfirmacaoComponent } from '../../util/confirmacao/confirmacao.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-lista-agenda-dispositivo',
  standalone: true,
  imports: [
    IconsModule,
    NgFor,
    MatDialogModule,
    MatButtonModule,
    DatePipe,
    CheckboxModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    ToastModule,
    ProximasAgendasComponent,
    MatSortModule,
    TooltipModule
  ],
  providers: [
    MessageService,
    {
      provide: MatPaginatorIntl, useClass: CustomPaginator
    }
  ],
  templateUrl: './lista-agenda-dispositivo.component.html',
  styleUrl: './lista-agenda-dispositivo.component.scss'
})
export class ListaAgendaDispositivoComponent {

  protected page?: PageEvent;
  protected agendas: Agenda[] = [];

  constructor(
    private readonly messageService: MessageService,
    private readonly agendaService: AgendaService,
    private readonly dialog: MatDialog,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.carregarLista(PAGE_INIT, undefined);
  }

  sortData(sort: Sort) {
    this.carregarLista(this.page, sort)
  }

  handlePageEvent(page: PageEvent, sort?: Sort) {
    this.carregarLista(page, sort);
  }

  private carregarLista(page?: PageEvent, sort?: Sort) {
    this.agendaService.listaTodosAgendas(sort, page).subscribe(response => {
      this.agendas = response.content;
      this.initPage(response);
    });
  }

  private initPage(response: any) {

    this.page = {
      pageIndex: response.page.number,
      length: response.page.totalElements,
      previousPageIndex: 0,
      pageSize: response.page.size
    }
    console.log(this.page);

  }

  getTradutor(efeito?: Efeito) {
    if (efeito)
      return EfeitoValue[efeito];
    return '';
  }

  remover(agenda: Agenda) {

    let retorno = this.dialog.open(ConfirmacaoComponent);
    retorno.afterClosed().subscribe(data => {
      if (data)
        this.agendaService.removerAgenda(agenda.id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Remoção',
            detail: 'Agenda foi deletada'
          });
          this.carregarLista();
        }, fail => {
          if (fail.error && fail.error.message) {
            this.messageService.add({
              severity: 'error',
              summary: 'Falha',
              detail: fail.error.message
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Falha',
              detail: 'Erro ao remover agenda!'
            });
          }
        });
    });

  }

  editar(agenda?: Agenda) {
    var retorno = this.dialog.open(FormularioAgendaComponent, {
      data: agenda
    })

    retorno.afterClosed().subscribe(data => {
      if (data)
        this.messageService.add({
          severity: 'success',
          summary: 'Agenda',
          detail: 'Agenda foi salva'
        });
      this.carregarLista(this.page);
    })
  }


  salvar(agenda: Agenda) {

    this.agendaService.alterarAgenda(agenda, false).subscribe(() => {

    }, fail => {
      console.log('Falaha ao salvar configuração');

    })
  }

  isSameDayAndMonth(agenda: Agenda): boolean {
    return (
      new Date(agenda.inicio).getDate() === new Date(agenda.termino).getDate() &&
      new Date(agenda.inicio).getMonth() === new Date(agenda.termino).getMonth()
    );
  }

  getCorStatus(agenda: Agenda){

    if(!agenda.status){
      return 'disable';
    }

    switch(agenda.status){
      case 'Executada' : return 'success';
      case 'Expirada' : return 'danger';
      case 'Aguardando' : return 'info';
      case 'Parada' : return 'disable';
    }
  }

}
