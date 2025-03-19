import { Component, Input, OnInit } from '@angular/core';
import { Cor } from '../../models/cor.model';
import { NgFor, NgIf } from '@angular/common';
import { CorService } from '../../dispositivos/services/cor.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmacaoComponent } from '../../util/confirmacao/confirmacao.component';
import { Parametro } from '../../models/parametro.model';
import { FormularioCorComponent } from '../formulario-cores/formulario-cores.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Comando, ComandoValue } from '../../models/constantes/comando';
import { Efeito, EfeitoValue } from '../../models/constantes/Efeito';
import { Role } from 'src/app/model/constantes/role.enum';
import { IconsModule } from 'src/app/IconsModule';
import { LabelCorComponent } from '../label-cor/label-cor.component';

@Component({
  selector: 'app-lista-parametros',
  standalone: true,
  imports: [
    NgFor, NgIf,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    IconsModule,
    MatDialogModule,
    LabelCorComponent
  ],
  providers: [
    MessageService
  ],
  templateUrl: './lista-parametros.component.html',
  styleUrl: './lista-parametros.component.scss'
})
export class ListaParametrosComponent implements OnInit {

  @Input() cor?: Cor;
  @Input() exibirBotoes = {
    add: true,
    back: true
  };
  @Input() edicao = true;

  constructor(
    private readonly corService: CorService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    if (!this.cor?.id)
      this.route.params?.subscribe(params => {
        if (params['cor'] != undefined) {
          this.corService.buscarCor(params['cor']).subscribe(response => {
            this.cor = response;
          })
        }
      })
  }

  remover(parametro: Parametro) {
    let retorno = this.dialog.open(ConfirmacaoComponent);
    retorno.afterClosed().subscribe(data => {
      if (data && this.cor){
        this.cor.parametros = this.cor?.parametros.filter(param => param.pino != parametro.pino);
        this.salvar();
      }
    });
  }

  isAutorizado(admin?: boolean) {
    if (admin)
      return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN])
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN, Role.ROLE_AVANCADO]);
  }

  getTradutor(comando?: Comando, efeito?: Efeito) {
    if (comando)
      return ComandoValue[comando];
    else if (efeito)
      return EfeitoValue[efeito];
    return '';
  }

  salvar() {
    if(this.cor)
    this.corService.salvarCor(this.cor, false).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Removido',
        detail: 'A configuração foi salvar!'
      });
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao salvar configuração!'
      });
    });
  }

  adicionar() {
    let retorno = this.dialog.open(FormularioCorComponent, {
      data: {
        cor: this.cor
      },
      panelClass: 'box-dialog'
    });

    retorno.afterClosed().subscribe(() => {
      this.corService.carregarLista.emit();
    });
  }

  editar(parametro: Parametro) {
    let retorno = this.dialog.open(FormularioCorComponent, {
      data: {
        cor: this.cor,
        parametro: parametro
      },
      panelClass: 'box-dialog'
    });
  }
}
