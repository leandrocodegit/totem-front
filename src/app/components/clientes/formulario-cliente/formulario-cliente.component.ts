import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MatCardModule } from '@angular/material/card';
import { ClienteService } from '../../dispositivos/services/cliente.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from '../../models/cliente.model';
import { Role } from 'src/app/model/constantes/role.enum';
import { EnderecoComponent } from '../../dispositivos/endereco/endereco.component';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-formulario-cliente',
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
    RouterModule,
    EnderecoComponent,
    CheckboxModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './formulario-cliente.component.html',
  styleUrl: './formulario-cliente.component.scss'
})
export class FormularioClienteComponent implements OnInit {

  protected cliente: Cliente = new Cliente;
  protected load = false;

  constructor(
    private readonly clienteService: ClienteService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (!this.cliente?.id)
      this.route.params?.subscribe(params => {
        if (params['id'] != undefined && params['id'] != 0) {
          this.load = true;
          this.clienteService.buscarCliente(params['id']).subscribe(response => {
            this.cliente = response;
            this.load = false;
          }, erro => {
            this.load = false;
          })
        }
      })
  }

  isAutorizado() {
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN])
  }

  salvar() {

      this.clienteService.salvarCleinte(this.cliente).subscribe((response) => {
        this.cliente = response;
        this.messageService.add({
          severity: 'success',
          summary: 'Atualizado',
          detail: 'Cliente salvo com sucesso'
        });
      }, fail => {
        if (fail.error && fail.error.message) {
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao salvar cliente'
          });
        }
      });

  }
}
