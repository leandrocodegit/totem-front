import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Dispositivo } from '../../models/dispositivo.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DispositivoService } from '../services/dispositivo.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { IconsModule } from '../../../IconsModule';
import { CardMapaCordenadasComponent } from '../../mapa/card-mapa-cordenadas/card-mapa-cordenadas.component';
import { CheckboxModule } from 'primeng/checkbox';
import { EnderecoComponent } from '../endereco/endereco.component';
import { response } from 'express';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-formulario-dispositivo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    ToastModule,
    IconsModule,
    MatDialogModule,
    CheckboxModule,
    EnderecoComponent,
    MatSelectModule,
  ],
  providers: [
    MessageService
  ],
  templateUrl: './formulario-dispositivo.component.html',
  styleUrl: './formulario-dispositivo.component.scss'
})
export class FormularioDispositivoComponent implements OnInit {

  protected dispositivo!: Dispositivo;
  protected editou = false;
  private copia: any;
  private alterado = false;
  protected clientes: Cliente[] = [];

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly messageService: MessageService,
    private readonly clienteService: ClienteService,
    private dialogRef: MatDialogRef<FormularioDispositivoComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      this.copia = JSON.parse(JSON.stringify(data));
      this.dispositivo = data;
    }

    dispositivoService.mapaEdit.subscribe(data => {
      if (data) {
        if (data.lat && data.lng) {
          this.dispositivo.conexao.latitude = data.lat;
          this.dispositivo.conexao.longitude = data.lng;
        }
      }
    })
  }

  ngOnInit(): void {
    this. carregarListaClientes();
  }

  fechar() {
    this.dialogRef.close(this.alterado ? undefined : this.copia);
  }

  salvar() {

    this.dispositivo.cliente = this.clientes.find(cliente => cliente.id == this.dispositivo.clienteId);

    this.dispositivoService.alterarNomeDicpositivo(this.dispositivo).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Alteração',
        detail: 'Dispositivo salvo'
      });
      this.alterado = true;
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao salvar dispositivo!'
      });
    });
  }

  selecionarCordenadas() {
    this.dialog.open(CardMapaCordenadasComponent, {
      panelClass: 'no-overflow'
    })
  }

  carregarListaClientes() {
    this.clienteService.listaClientes(true).subscribe(response => {
      this.clientes = response.content;
    });
  }
}
