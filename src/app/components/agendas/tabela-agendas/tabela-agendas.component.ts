import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgendaService } from '../../dispositivos/services/agenda.service';
import { Router } from '@angular/router';
import { Agenda } from '../../models/agenda.model';
import { Efeito, EfeitoValue } from '../../models/constantes/Efeito';
import { IconsModule } from '../../../IconsModule';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FormularioAgendaComponent } from '../formulario-agenda/formulario-agenda.component';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomPaginator } from '../../../util/CustomPaginator';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-tabela-agendas',
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
    NgIf
  ],
  providers: [
    MessageService,
    {
      provide: MatPaginatorIntl, useClass: CustomPaginator
    }
  ],
  templateUrl: './tabela-agendas.component.html',
  styleUrl: './tabela-agendas.component.scss'
})
export class TabelaAgendasComponent {

  protected page?: PageEvent;
  @Input() agendas: Agenda[] = [];
  @Input() resumo = false;
  @Output() updateEmit = new EventEmitter;

  constructor(
    private readonly messageService: MessageService,
    private readonly agendaService: AgendaService,
    private readonly dialog: MatDialog,
    private router: Router
  ) {
  }


  getTradutor(efeito?: Efeito) {
    if (efeito)
      return EfeitoValue[efeito];
    return '';
  }

  remover(agenda: Agenda) {
    this.agendaService.removerAgenda(agenda.id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Remoção',
        detail: 'Agenda foi deletada'
      });
      this.updateEmit.emit();
    }, fail =>{
      if(fail.error && fail.error.message){
        this.messageService.add({
          severity: 'error',
          summary: 'Falha',
          detail: fail.error.message
        });
      }else{
        this.messageService.add({
          severity: 'error',
          summary: 'Falha',
          detail: 'Erro ao remover agenda!'
        });
      }

    });
  }

  editar(agenda?: Agenda) {
    var retorno = this.dialog.open(FormularioAgendaComponent, {
      data: agenda
    })

    retorno.afterClosed().subscribe(data => {
      if(data)
      this.messageService.add({
        severity: 'success',
        summary: 'Agenda',
        detail: 'Agenda foi salva'
      });
      this.updateEmit.emit();
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

}
