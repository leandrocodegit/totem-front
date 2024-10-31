import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../IconsModule';
import { Dispositivo } from '../../models/dispositivo.model';
import { NgFor } from '@angular/common';
import { Comando, ComandoValue } from '../../models/constantes/comando';
import { Efeito, EfeitoValue } from '../../models/constantes/Efeito';
import { DispositivoService } from '../services/dispositivo.service';
import { response } from 'express';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PainelConfiguracoesComponent } from '../painel-configuracoes/painel-configuracoes.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-dispositivos',
  standalone: true,
  imports: [
    IconsModule,
    NgFor,
    MatDialogModule
  ],
  templateUrl: './tabela-dispositivos.component.html',
  styleUrl: './tabela-dispositivos.component.scss'
})
export class TabelaDispositivosComponent {

  @Input() dispositivos: Dispositivo[] = [];

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  getTradutor(comando?: Comando, efeito?: Efeito) {
    if (comando)
      return ComandoValue[comando];
    else if (efeito)
      return EfeitoValue[efeito];
    return '';
  }


  mudarStatus(dispositivo: Dispositivo){
    dispositivo.ativo = !dispositivo.ativo;
    this.dispositivoService.mudarStatus(dispositivo.mac).subscribe();
  }

  sincronizar(dispositivo: Dispositivo){
    this.dispositivoService.sincronizar([dispositivo.mac]).subscribe();
  }

  configurar(dispositivo: Dispositivo){
    this.router.navigate(['/dispositivos/configuracoes/' + dispositivo.mac]);
  }


}
