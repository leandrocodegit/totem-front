import { Component, Input, OnInit } from '@angular/core';
import { CorService } from '../../dispositivos/services/cor.service';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../auth/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Cor } from '../../models/cor.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IconsModule } from 'src/app/IconsModule';
import { ToastModule } from 'primeng/toast';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { Role } from 'src/app/model/constantes/role.enum';
import { MatSliderModule } from '@angular/material/slider';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-criar-cor',
  standalone: true,
  imports: [
    MatCardModule,
    RouterModule,
    MatButtonModule,
    IconsModule,
    ToastModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSliderModule,
    CheckboxModule,
    MatDialogModule
  ],
  templateUrl: './criar-cor.component.html',
  styleUrl: './criar-cor.component.scss'
})
export class CriarCorComponent implements OnInit {

  @Input() cor: Cor = {} as Cor;
  @Input() apenasCriar = false;

  constructor(
    private readonly corService: CorService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly dialog: MatDialog,
    private route: ActivatedRoute,
  ) {

  }
  ngOnInit(): void {
    if (!this.cor.id)
      this.route.params?.subscribe(params => {
        if (params['cor'] != undefined) {
          this.corService.buscarCor(params['cor']).subscribe(response => {
            this.cor = response;
          })
        }
      })
  }


  isAutorizado(admin?: boolean) {
    if (admin)
      return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN])
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN, Role.ROLE_AVANCADO]);
  }

  salvar() {
    if(this.cor)
      this.corService.salvarCor(this.cor, false).subscribe(reponse => {
    this.cor = reponse;
        this.messageService.add({
          severity: 'success',
          summary: 'Adicionado',
          detail: 'Configuração salva'
        });
      }, fail =>{
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao salvar configuração!'
          });
      });
    }
}
