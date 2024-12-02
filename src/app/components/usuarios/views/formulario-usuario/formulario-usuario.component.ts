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
    NgIf,
    ToastModule,
    MessagesModule,
    MatCardModule
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
  messages: Message[] | undefined;

  constructor(
    private readonly _router: Router,
    private userService: UserService,
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<FormularioUsuarioComponent>) {
    if (data) {
      this.user = data;
      this.user.password = '****************';
      this.user.confirmPassword = '****************';
    }
    else {
      this.user = new UserRequest
    }
  }

  ngOnInit(): void { }

  fechar(): void {
    this.dialogRef.close();
  }

  salvar() {
    if (this.user && this.user.id && this.user.id != '') {
      this.userService.AtualizarUsuario(this.user).subscribe(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Atualizado',
          detail: 'Usuário foi atualizado com sucesso'
        });
      }, fail => {
        if (fail.error && fail.error.message) {
          this.messages = JSON.parse(fail.error.message);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao atualizar usuário'
          });
        }
      });
    } else {
      this.userService.criarUsuario(this.user).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Atualizado',
          detail: 'Usuário foi criado com sucesso'
        });
      }, fail => {
        if (fail.error && fail.error.message) {
          this.messages = JSON.parse(fail.error.message);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao criar usuário'
          });
        }
      });
    }


  }

  isAutorizado() {
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN]);
  }

}


