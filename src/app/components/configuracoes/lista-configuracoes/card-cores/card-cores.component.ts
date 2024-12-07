import { Component } from '@angular/core';
import { ListaCoresComponent } from '../lista-cores.component';
import { MatCardModule } from '@angular/material/card';
import { Cor } from 'src/app/components/models/cor.model';
import { MessageService } from 'primeng/api';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CorService } from 'src/app/components/dispositivos/services/cor.service';
import { MatButtonModule } from '@angular/material/button';
import { FormularioCorComponent } from '../../formulario-cores/formulario-cores.component';
import { AuthService } from 'src/app/components/auth/services/auth.service';
import { Role } from 'src/app/model/constantes/role.enum';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card-configuracoes',
  standalone: true,
  imports: [
    ListaCoresComponent,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    NgIf
  ],
  providers: [
    MessageService
  ],
  templateUrl: './card-cores.component.html',
  styleUrl: './card-cores.component.scss'
})
export class CardConfiguracoesComponent {

  protected cor: Cor = new Cor;

  constructor(
    private readonly corService: CorService,
    private readonly dialog: MatDialog,
    private readonly authService: AuthService,
  ) { }

  adicionar(){
    let retorno = this.dialog.open(FormularioCorComponent, {
      data: this.cor,
      panelClass: 'box-dialog'
    });

    retorno.afterClosed().subscribe(() => {
      this.corService.carregarLista.emit();
    });
  }

  isAutorizado(admin?: boolean){
    if(admin)
      return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN])
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN, Role.ROLE_AVANCADO]);
   }

}
