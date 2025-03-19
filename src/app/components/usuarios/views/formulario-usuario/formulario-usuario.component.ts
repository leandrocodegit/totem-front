import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../../model/constantes/role.enum';
import { User } from '../../../models/user.model';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { UserRequest } from 'src/app/components/models/user-request.model';
import { MatCardModule } from '@angular/material/card';
import { ClienteService } from 'src/app/components/dispositivos/services/cliente.service';
import { Cliente } from 'src/app/components/models/cliente.model';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ToastModule,
    MessagesModule,
    MatCardModule,
    CheckboxModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.scss'
})
export class FormularioUsuarioComponent {

  protected checked = true;
  protected user!: UserRequest;
  protected role: Role = Role.ROLE_USER;
  protected messages: Message[] | undefined;
  protected clientes: Cliente[] = [];

  constructor(
    private readonly clienteService: ClienteService,
    private userService: UserService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<FormularioUsuarioComponent>) {
    if (data) {
      this.user = data;
      this.user.password = '****************';
      this.user.confirmPassword = '****************';
      if(this.user.roles.length > 0)
        this.role = this.user.roles[0]
    }
    else {
      this.user = new UserRequest
    }
  }

  ngOnInit(): void {
    this.carregarListaClientes();
   }

  fechar(): void {
    this.dialogRef.close();
  }

  carregarListaClientes() {
    this.clienteService.listaClientes(true).subscribe(response => {
      this.clientes = response.content;
    });
  }

  salvar() {
    this.user.roles = [this.role]
    if (this.user && this.user.id && this.user.id != '') {
      this.userService.AtualizarUsuario(this.user).subscribe(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Atualizado',
          detail: 'Usuário foi atualizado com sucesso'
        });
      }, fail => {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: fail.error.message
          });
      });
    } else {
      this.userService.criarUsuario(this.user).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Atualizado',
          detail: 'Usuário foi criado com sucesso'
        });
      }, fail => {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao criar usuário'
          });
      });
    }


  }

  isAutorizado() {
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN]);
  }

  isRoot() {
    return this.authService.isAuthorizedRoles([Role.ROLE_ROOT]);
  }

}


