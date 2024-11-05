import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IconsModule } from '../../../IconsModule';
import { Dispositivo } from '../../models/dispositivo.model';
import { NgFor, NgIf } from '@angular/common';
import { Comando, ComandoValue } from '../../models/constantes/comando';
import { EfeitoValue } from '../../models/constantes/Efeito';
import { DispositivoService } from '../services/dispositivo.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Configuracao } from '../../models/configuracao.model';
import { FormularioDispositivoComponent } from '../formulario-dispositivo/formulario-dispositivo.component';
import { Filtro } from '../../models/constantes/filtro';
import { Agenda } from '../../models/agenda.model';
import { FormsModule } from '@angular/forms';

var initDialog = true;

@Component({
  selector: 'app-tabela-dispositivos',
  standalone: true,
  imports: [
    IconsModule,
    NgFor, NgIf,
    MatDialogModule,
    CheckboxModule,
    FormsModule
  ],
  templateUrl: './tabela-dispositivos.component.html',
  styleUrl: './tabela-dispositivos.component.scss'
})
export class TabelaDispositivosComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() dispositivos: Dispositivo[] = [];
  @Input() agenda!: Agenda;
  @Input() exibirAcoes: boolean = true;
  @Input() checkEmit: boolean = false;
  @Output() selecionarEmit = new EventEmitter; 


  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly dialog: MatDialog,
    private readonly activeRoute: ActivatedRoute,
    private readonly route: Router
  ) { }

  ngOnInit(): void {
    if (this.route.url.includes('dispositivos/lista/cordenadas/')) {
      
      
      this.activeRoute.params?.subscribe(params => {
        if (params['latitude'] != undefined && params['longitude'] != undefined) {
          this.editar({
            selecionado: false,
            mac: 'string',
            nome: 'string',
            ip: 'string',
            memoria: 0,
            ativo: true,
            conexao: 'string',
            latitude: params['latitude'],
            longitude: params['longitude'],
            configuracao: new Configuracao,
            configuracoes: [],
            comando: Comando.ACEITO
          } as Dispositivo);
          this.route.navigate(['dispositivos']);
          console.log("dialog");
          initDialog = false;
        }
      }) 
  }
  }

  ngAfterViewInit(): void {
    console.log(this.activeRoute.snapshot);
    if (this.checkEmit) {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.ATIVO).subscribe(response => {
        this.dispositivos = response.content;
        this.dispositivos.forEach(it => {
          if (this.agenda.dispositivos.find(device => device.mac === it.mac)) {
            it.selecionado = true;
          }
          else {
            it.selecionado = false;
          }
        })
      });

    }  
  }

  ngOnDestroy(): void {
    initDialog = true;
    console.log('Destroy', initDialog);
    
  }

  getTradutor(comando?: Comando, configuracao?: Configuracao) {
    if (comando)
      return ComandoValue[comando];
    else if (configuracao)
      return EfeitoValue[configuracao.efeito!];
    return '';
  }

  mudarStatus(dispositivo: Dispositivo) {
    dispositivo.ativo = !dispositivo.ativo;
    this.dispositivoService.mudarStatus(dispositivo.mac).subscribe();
  }

  editar(dispositivo: Dispositivo) {
    let retorno = this.dialog.open(FormularioDispositivoComponent, {
      data: dispositivo
    })

    retorno.afterClosed().subscribe(() => {
      this.dispositivoService.listaTodosDispositivosFiltro(Filtro.ATIVO).subscribe(response => this.dispositivos = response.content);
    })
  }

  sincronizar(dispositivo: Dispositivo, teste: boolean) {
    this.dispositivoService.sincronizar([dispositivo.mac], teste).subscribe();
  }

  configurar(dispositivo: Dispositivo) {
    this.route.navigate(['/dispositivos/configuracoes/' + dispositivo.mac]);
  }

  selecionarDispositivo(dispositivo: Dispositivo) {
    this.selecionarEmit.emit(dispositivo);
  }
}
