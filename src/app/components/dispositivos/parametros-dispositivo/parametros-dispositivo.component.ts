import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { CorService } from '../services/cor.service';
import { Cor } from '../../models/cor.model';
import { ComandoService } from '../services/comando.service';
import { Tipoconfiguracao } from '../../models/constantes/tipo-configuracao';
import { MessageService } from 'primeng/api';
import { InputMaskModule } from 'primeng/inputmask';
import { NgxMaskDirective } from 'ngx-mask';
import { AuthService } from '../../auth/services/auth.service';
import { Role } from 'src/app/model/constantes/role.enum';
import { environment } from 'src/environments/environment.dev';


@Component({
  selector: 'app-parametros-dispositivo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    CheckboxModule,
    ToastModule,
    NgxMaskDirective
  ],
  providers: [
    MessageService
  ],
  templateUrl: './parametros-dispositivo.component.html',
  styleUrl: './parametros-dispositivo.component.scss'
})
export class ParametrosDispositivoComponent implements OnInit {

  @Input() dispositivo!: Dispositivo;
  @Output() salvarEmit = new EventEmitter;

  protected cores: Cor[] = [];

  constructor(
    private readonly corService: CorService,
    private readonly comandoService: ComandoService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
  ) {

    comandoService.temporizadorEmit.subscribe(data => {
      if (data) {
        if (data.includes('não') || data.toUpperCase().includes('FALHA') || data.includes('Erro')) {
          this.messageService.add({
            severity: 'error',
            summary: 'Configuração',
            detail: data
          });
        }
        else if (data.includes('ok')) {
          this.messageService.add({
            severity: 'info',
            summary: 'Configuração',
            detail: 'Comando foi enviado'
          });
        } else if (data.includes('aceito')) {
          this.messageService.add({
            severity: 'success',
            summary: 'Configuração',
            detail: data
          });
        }
      }
    })
  }

  ngOnInit(): void {
    if (!this.dispositivo?.operacao?.corVibracao?.id)
      this.dispositivo.operacao.corVibracao = new Cor
    this.carregarcoresVibracao();
  }

  salvar() {
    this.salvarEmit.emit(this.dispositivo);
  }

  carregarcoresVibracao() {
    this.corService.listaTodasConfiguracoes(false, true, false).subscribe(response => this.cores = response.content);
  }

  enviarConfiguracoesVibracao() {
    this.enviarConfiguracoes(Tipoconfiguracao.VIBRACAO);
  }

  enviarConfiguracoesWIFI() {
    this.enviarConfiguracoes(Tipoconfiguracao.WIFI);
  }

  enviarConfiguracoesLoraWan(param: boolean) {
    if (param)
      this.enviarConfiguracoes(Tipoconfiguracao.LORA_WAN_PARAM);
    else this.enviarConfiguracoes(Tipoconfiguracao.LORA_WAN);
  }

  enviarConfiguracoesLoraWanJoin() {
    this.enviarConfiguracoes(Tipoconfiguracao.LORA_WAN_JOIN);
  }

  enviarConfiguracoesLoraWanSend() {
    this.enviarConfiguracoes(Tipoconfiguracao.LORA_WAN_SEND);
  }

  enviarConfiguracoesLoraWanReset() {
    this.enviarConfiguracoes(Tipoconfiguracao.LED_RESTART);
  }

abrirDebug(){
  const novaJanela = window.open(environment.debug + this.dispositivo.id, '_blank', 'width=1100,height=820,overflow=none');
}

  enviarConfiguracoes(tipo: Tipoconfiguracao) {
    try {
      this.comandoService.sincronizarDispositivo(this.dispositivo.id, tipo).subscribe({
        next: (data) => {
        },
        complete: () => {
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao enviar comando'
          });
        }
      },);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao enviar comando'
      });
    }
  }

  isAutorizado() {
    return this.authService.isAuthorizedRoles([Role.ROLE_ADMIN]);
  }

  isRoot() {
    return this.authService.isAuthorizedRoles([Role.ROLE_ROOT]);
  }

  gerarListaDecimal(): number[] {
  const lista: number[] = [];
  const inicio = 0.05;
  const fim = 10.0;
  const passo = 0.01;

  // Usamos um loop baseado no número de iterações para evitar acúmulo de erro decimal
  // (10.0 - 0.05) / 0.01 = 995 iterações
  const totalIteracoes = Math.round((fim - inicio) / passo);

  for (let i = 0; i <= totalIteracoes; i++) {
    // Calculamos o valor multiplicando o índice para manter a precisão
    const valor = parseFloat((inicio + i * passo).toFixed(2));
    lista.push(valor);
  }

  return lista;
}
}
