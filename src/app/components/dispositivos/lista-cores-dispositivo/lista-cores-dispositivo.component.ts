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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ComandoService } from '../services/comando.service';

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
  providers: [
    MessageService
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
    private readonly comandoService: ComandoService,
    private router: ActivatedRoute,
    private route: Router
  ) {

   

  }

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
      cor.mac = this.dispositivo.mac;
      this.corService.salvarCor(cor, true).subscribe(() => {
        this.dispositivo.cor = cor;
        this.route.navigate([`/dispositivos/configuracoes/${this.dispositivo.mac}/0`]);
        console.log(`/dispositivos/configuracoes/${this.dispositivo.mac}`);

      }, fail => {
        console.log('Falaha ao salvar configuração');

      })
    }
  }


}

