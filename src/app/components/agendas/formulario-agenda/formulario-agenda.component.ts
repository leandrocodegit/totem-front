import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Agenda } from '../../models/agenda.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Cor } from '../../models/cor.model';
import { MatSelectModule } from '@angular/material/select';
import { TabelaDispositivosComponent } from '../../dispositivos/tabela-dispositivos/tabela-dispositivos.component';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { CorService } from '../../dispositivos/services/cor.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatCardModule } from '@angular/material/card';
import { AgendaService } from '../../dispositivos/services/agenda.service';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import { IconsModule } from '../../../IconsModule';
 import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { FormularioCorComponent } from '../../configuracoes/formulario-cores/formulario-cores.component';
import { NgIf } from '@angular/common';


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
  protected cores: Cor[] = [];
  protected range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly corService: CorService,
    private readonly messageService: MessageService,
    private readonly agendaService: AgendaService,
    private dialogRef: MatDialogRef<FormularioAgendaComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.agenda = JSON.parse(JSON.stringify(data));
      if(!this.agenda.cor){
        this.agenda.cor = new Cor;
      }
    } else {
      this.agenda = new Agenda
    }
  }

  ngOnInit() {
    this.corService.listaTodasConfiguracoes().subscribe(response => this.cores = response.content);
  }

  novaConfiguracao(){
    this.dialog.open(FormularioCorComponent, {
      panelClass: 'box-dialog'
    }    )
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
        this.dialogRef.close(true);
      }, fail => {
        this.messageService.add({
          severity: 'error',
          summary: 'Falha',
          detail: 'Erro ao salvar agenda!'
        });
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
      if(!this.agenda.dispositivos.find(device => device == dispositivo.mac)){
        this.agenda.dispositivos.push(dispositivo.mac);
      }
    }else{
        this.agenda.dispositivos = this.agenda.dispositivos.filter(device => device != dispositivo.mac);
    }
  }
}
