import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { IconsModule } from 'src/app/IconsModule';
import { Integracao } from '../../models/integracao.model';
import { IntegracaoService } from '../../dispositivos/services/integracao.service';
import { MessageService } from 'primeng/api';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { PAGE_INIT } from '../../models/constantes/PageUtil';
import { FormularioIntegracaoComponent } from '../formulario-integracao/formulario-integracao.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    IconsModule,
    NgFor,
    MatDialogModule,
    CheckboxModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    TooltipModule,
    ToastModule,
    ClipboardModule,
    MatButtonModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit {

  protected integracoes: Integracao[] = [];
  protected page?: PageEvent;

  constructor(
    private readonly integracaoService: IntegracaoService,
    private readonly messageService: MessageService,
    private readonly dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.carregarIntegracoes(PAGE_INIT);
  }

  carregarIntegracoes(page?: PageEvent) {
    this.integracaoService.listaTodasIntegracoes(page).subscribe(response => {
      this.integracoes = response.content;
      this.initPage(response);
    });
  }

  remover(cliente: Integracao) {
    this.integracaoService.removerIntegracao(cliente.nome).subscribe(response => {
      this.messageService.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: "Chave foi removida"
      });
      this.carregarIntegracoes(this.page);
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Falha ao remover chave'
      });
    });
  }

  novaChave() {
    var retorno = this.dialog.open(FormularioIntegracaoComponent);
    retorno.afterClosed().subscribe(() => this.carregarIntegracoes());
  }

  sortData(sort: Sort) {
  }

  handlePageEvent(page: PageEvent) {
    this.page = page;
    this.carregarIntegracoes(page)
  }

  private initPage(response: any) {
    this.page = {
      pageIndex: response.page.number,
      length: response.page.totalElements,
      previousPageIndex: 0,
      pageSize: response.page.size
    }
  }
}
