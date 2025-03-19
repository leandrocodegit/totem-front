import { Component } from '@angular/core';
import { IconsModule } from '../../../../IconsModule';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../models/user.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { PAGE_INIT } from '../../../models/constantes/PageUtil';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { Role, RoleDescriptions } from '../../../../model/constantes/role.enum';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { FormularioSenhaUsuarioComponent } from '../formulario-senha-usuario/formulario-senha-usuario.component';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';


const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-lista-usuarios',
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
    MatTabsModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent {

  protected usuarios: User[] = [];
  protected page?: PageEvent;
  protected nomeFind = new Subject<any>();
  protected tabSelect = 0;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {
    this.nomeFind.pipe(
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(value => {
        if (value != undefined && value.length > 2) {
          this.userService.pesquisarUsuarios(value, PAGE_INIT).subscribe(response => {
            this.usuarios = response.content;
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

  isAutorizado(){
   return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN])
  }

  handlePageEvent(page: PageEvent) {
    this.carregarLista(page);
  }

  carregarLista(page?: PageEvent) {
    this.userService.listaTodosUsuarios(this.tabSelect == 0, page).subscribe(response => {
      this.usuarios = response.content;
      this.initPage(response);
    });
  }


  getRole(user: User): string{
    if(user.roles.length > 0){
      return RoleDescriptions[user.roles[0]] as string
    }

    return '--'

  }

  private initPage(response: any) {
    this.page = {
      pageIndex: response.page.number,
      length: response.page.totalElements,
      previousPageIndex: 0,
      pageSize: response.page.size
    }
  }

  adicionarUsuario() {
    const retorno = this.dialog.open(FormularioUsuarioComponent);

    retorno.afterClosed().subscribe(data => {
        this.carregarLista();
    })
  }

  editarUsuario(user: User) {
    const retorno = this.dialog.open(FormularioUsuarioComponent, {
      data: JSON.parse(JSON.stringify(user))
    })
    retorno.afterClosed().subscribe(data => {
     if (data && data.id) {
        let userData = this.usuarios.find((user:any) => user.id == data.id);
        if (userData)
          this.usuarios[this.usuarios.indexOf(userData!)] = data;
        this.messageService.add({
          severity: 'success',
          summary: 'Altualizado',
          detail: `${user.nome} foi salvo}}`
        });
        this.carregarLista();
      }
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
          detail: 'Erro ao alterar usuário!'
        });
      }
    });
  }

  alterarSenhaUsuario(user: User) {
    this.dialog.open(FormularioSenhaUsuarioComponent, {
      data: JSON.parse(JSON.stringify(user))
    })
  }

  bloquearUsuario(user: User) {
    this.userService.mudarStatusUser(user.id).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Removido',
        detail: `${user.nome} foi ${!user.status ? 'desbloqueado' : 'bloqueado'}}`
      });
      this.carregarLista();
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
          detail: 'Erro ao alterar usuário!'
        });
      }
    });
  }

  removerUsuario(user: User) {
   this.userService.removerUser(user.id).subscribe(() => {
    this.messageService.add({
      severity: 'success',
      summary: 'Removido',
      detail: `${user.nome} foi removido`
    });
    this.carregarLista();
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
        detail: 'Erro ao remover usuário!'
      });
    }
  });
  }

  redirect(url: string) {
    this.router.navigate([url])
  }

  onTabChange(event: MatTabChangeEvent) {
    this.tabSelect = event.index;
    this.carregarLista();
  }
}


