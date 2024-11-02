import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Agenda } from '../../models/agenda.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Configuracao } from '../../models/configuracao.model';
import { MatSelectModule } from '@angular/material/select';
import { TabelaDispositivosComponent } from '../../dispositivos/tabela-dispositivos/tabela-dispositivos.component';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { ConfiguracaoService } from '../../dispositivos/services/configuracao.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatCardModule } from '@angular/material/card';
import { AgendaService } from '../../dispositivos/services/agenda.service';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import { IconsModule } from '../../../IconsModule';
import { FormularioConfiguracaoComponent } from '../../configuracoes/formulario-configuracao/formulario-configuracao.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';


const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM',
  },
  display: {
    dateInput: 'DD/MM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-formulario-agenda',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    TabelaDispositivosComponent,
    MatCardModule,
    IconsModule,
    MatDialogModule,
    ToastModule
  ],
  providers: [
    MessageService,
    provideMomentDateAdapter(MY_FORMATS),
  ],
  templateUrl: './formulario-agenda.component.html',
  styleUrl: './formulario-agenda.component.scss'
})
export class FormularioAgendaComponent implements OnInit {

  protected date = new FormControl(moment());
  protected agenda: Agenda;
  protected configuracoes: Configuracao[] = [];
  protected range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly configuracaoService: ConfiguracaoService,
    private readonly messageService: MessageService,
    private readonly agendaService: AgendaService,
    private dialogRef: MatDialogRef<FormularioAgendaComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.agenda = JSON.parse(JSON.stringify(data));
      if(!this.agenda.configuracao){
        this.agenda.configuracao = new Configuracao;
      }
    } else {
      this.agenda = new Agenda
    }
  }

  ngOnInit() {
    this.configuracaoService.listaTodasConfiguracoes().subscribe(response => this.configuracoes = response.content);
  }

  novaConfiguracao(){
    this.dialog.open(FormularioConfiguracaoComponent, {
      panelClass: 'box-dialog'
    }

    )
  }

  fechar() {
    this.dialogRef.close();
  }

  salvar(removerConflitos: boolean) {
    if (this.agenda.id == '') {

      if(!this.agenda.termino && this.agenda.inicio){
        this.agenda.termino = this.agenda.inicio;
      }
      this.agendaService.criarAgenda(this.agenda).subscribe(() => {
      }, fail => {
        console.log('Falha ao salvar');
      });
    } else {
      if(!this.agenda.termino && this.agenda.inicio){
        this.agenda.termino = this.agenda.inicio;
      }
      this.agendaService.alterarAgenda(this.agenda, removerConflitos).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Alteração',
          detail: 'Agenda alterada'
        });
      }, fail =>{
        if(fail.error && fail.error.message){
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: fail.error.message
          });
        }else{
          this.messageService.add({
            severity: 'error',
            summary: 'Falha',
            detail: 'Erro ao salvar agenda!'
          });
        }

      });
    }
  }

  adicionarDispositivo(dispositivo: Dispositivo){
    if(dispositivo.selecionado){
      if(!this.agenda.dispositivos.find(device => device.mac == dispositivo.mac)){
        this.agenda.dispositivos.push(dispositivo);
      }
    }else{
        this.agenda.dispositivos = this.agenda.dispositivos.filter(device => device.mac != dispositivo.mac);
    }
  }



}
