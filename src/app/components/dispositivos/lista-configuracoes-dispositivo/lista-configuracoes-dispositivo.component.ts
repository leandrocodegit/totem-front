import { Component, Input, OnInit } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { Efeito, EfeitoValue } from '../../models/constantes/Efeito';
import { ActivatedRoute, Router } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Comando, ComandoValue } from '../../models/constantes/comando';
import { IconsModule } from '../../../IconsModule';
import { NgFor } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Configuracao } from '../../models/configuracao.model';
import { MatRadioModule } from '@angular/material/radio';
import { ConfiguracaoService } from '../services/configuracao.service';
import { MatButtonModule } from '@angular/material/button';
import { response } from 'express';
import { ListaConfiguracoesComponent } from '../../configuracoes/lista-configuracoes/lista-configuracoes.component';

@Component({
  selector: 'app-lista-configuracoes-dispositivo',
  standalone: true,
  imports: [
    IconsModule,
    NgFor,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    ListaConfiguracoesComponent
  ],
  templateUrl: './lista-configuracoes-dispositivo.component.html',
  styleUrl: './lista-configuracoes-dispositivo.component.scss'
})
export class ListaConfiguracoesDispositivoComponent {

  @Input() dispositivo!: Dispositivo;
  @Input() tab = 0;
  @Input() configuracoes: Configuracao[] = [];
  protected alterouPrincipal: boolean = false;

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly configuracaoService: ConfiguracaoService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {

    if (!this.dispositivo) {
     // this.router.navigate(['/dispositivos'])
    }
  }

  getTradutor(comando?: Comando, efeito?: Efeito) {
    if (comando)
      return ComandoValue[comando];
    else if (efeito)
      return EfeitoValue[efeito];
    return '';
  }

  remover(configuracao: Configuracao) {
    this.configuracaoService.removerConfiguracao(configuracao.id).subscribe();
  }

  configurar(configuracao: Configuracao) {
  }

  salvar(configuracao: Configuracao){
    if(configuracao){
      configuracao.mac = this.dispositivo.mac;
      this.configuracaoService.salvarConfiguracao(configuracao, true).subscribe(() => {
        this.dispositivo.configuracao = configuracao;
        this.route.navigate([`/dispositivos/configuracoes/${this.dispositivo.mac}/0`]);
        console.log(`/dispositivos/configuracoes/${this.dispositivo.mac}`);

      }, fail => {
        console.log('Falaha ao salvar configuração');

      })
    }
  }


}

