import { Component, Input, OnInit } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { Efeito, EfeitoValue } from '../../models/constantes/Efeito';
import { ActivatedRoute, Router } from '@angular/router';
import { DispositivoService } from '../services/dispositivo.service';
import { Comando, ComandoValue } from '../../models/constantes/comando';
import { IconsModule } from '../../../IconsModule';
import { NgFor } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { Cor } from '../../models/cor.model';
import { MatRadioModule } from '@angular/material/radio';
import { CorService } from '../services/cor.service';
import { MatButtonModule } from '@angular/material/button';
import { ListaCoresComponent } from '../../configuracoes/lista-configuracoes/lista-cores.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lista-cores-dispositivo',
  standalone: true,
  imports: [
    IconsModule,
    MatDialogModule,
    MatRadioModule,
    MatButtonModule,
    ListaCoresComponent,
    ToastModule
  ],
  templateUrl: './lista-cores-dispositivo.component.html',
  styleUrl: './lista-cores-dispositivo.component.scss'
})
export class ListaCoresDispositivoComponent {

  @Input() dispositivo!: Dispositivo;
  @Input() tab = 0;
  @Input() cores: Cor[] = [];
  protected alterouPrincipal: boolean = false;

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly corService: CorService,
    private readonly messageService: MessageService,
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

  remover(cor: Cor) {
    this.corService.removerCor(cor.id).subscribe();
  }

  configurar(configuracao: Cor) {
  }

  salvar(cor: Cor){
    if(cor){
      cor.deviceId = this.dispositivo.id;
      this.corService.salvarCor(cor, true).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Configuração',
          detail: 'Configuração foi salva com sucesso'
        });
        this.dispositivo.cor = cor;
        this.route.navigate([`/dispositivos/configuracoes/${this.dispositivo.id}/0`]);
        console.log(`/dispositivos/configuracoes/${this.dispositivo.id}`);

      }, fail => {
        this.messageService.add({
          severity: 'error',
          summary: 'Falha',
          detail: 'Falaha ao salvar configuração'
        });

      })
    }
  }
}

