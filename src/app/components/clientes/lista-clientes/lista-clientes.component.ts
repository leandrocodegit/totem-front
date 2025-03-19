import { Component } from '@angular/core';
import { ClienteService } from '../../dispositivos/services/cliente.service';
import { MessageService } from 'primeng/api';
import { Cliente } from '../../models/cliente.model';
import { IconsModule } from 'src/app/IconsModule';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PAGE_INIT } from '../../models/constantes/PageUtil';
import { AuthService } from '../../auth/services/auth.service';
import { Role } from 'src/app/model/constantes/role.enum';
import { RouterModule } from '@angular/router';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-lista-clientes',
  standalone: true,
  imports: [
    IconsModule,
    NgFor, NgIf,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ToastModule,
    MatPaginatorModule,
    TooltipModule,
    RouterModule,
    MatTabsModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './lista-clientes.component.html',
  styleUrl: './lista-clientes.component.scss'
})
export class ListaClientesComponent {

  protected page?: PageEvent;
  protected clientes: Cliente[] = [];
  protected nomeFind = new Subject<any>();
  protected tabSelect = 0;

  constructor(
    private readonly clienteService: ClienteService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog
  ) {
    this.nomeFind.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        if (value != undefined && value.length > 2) {
          this.clienteService.pesquisarCliente(this.tabSelect == 0, value).subscribe(response => {
            this.clientes = response.content;
            this.initPage(response);
          });
        } else {
          this.carregarLista(PAGE_INIT);
        }
      });
  }

  ngOnInit(): void {
    this.carregarLista(PAGE_INIT)
  }

  isAutorizado() {
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN])
  }

  permiteEditarCliente() {
    if (this.isAutorizado() && this.authService.isBusiness())
      return true;
    return this.authService.isAuthorizedRoles([Role.ROLE_ROOT])
  }

  handlePageEvent(page: PageEvent) {
    this.carregarLista(page);
  }

  carregarLista(page?: PageEvent) {
    this.clienteService.listaClientes(this.tabSelect == 0, undefined, page).subscribe(response => {
      this.clientes = response.content;
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
  }

  remover(cliente: Cliente) {
    this.clienteService.removerCliente(cliente).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Removido',
        detail: `${cliente.nome} foi removido`
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
          detail: 'Erro ao remover cliente!'
        });
      }
    });
  }

  redirect(url: string) {

  }

  onTabChange(event: MatTabChangeEvent) {
    this.tabSelect = event.index;
    this.carregarLista();
  }
}


