import { Component, Input, OnInit } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { ComandoService } from '../services/comando.service';
import { response } from 'express';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'src/environments/environment.prod';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-atualizar-firmware',
  standalone: true,
  imports: [
    MatButtonModule,
    ToastModule
  ],
  providers: [
    MessageService,
    MqttService
  ],
  templateUrl: './atualizar-firmware.component.html',
  styleUrl: './atualizar-firmware.component.scss'
})
export class AtualizarFirmwareComponent implements OnInit {

  @Input() dispositivo?: Dispositivo;
  protected selectedFile: File | null = null;
  protected mensagens: string[] = [];
  private atualizarPayload = false;

  constructor(
    private readonly comandoService: ComandoService,
    private readonly messageService: MessageService,
    private readonly mqttSevice: MqttService,
  ) {

    /*  comandoService.firmwareEmit.subscribe(data => {

       if (data) {
         if (data.includes('não') || data.toUpperCase().includes('FALHA')) {
           this.messageService.add({
             severity: 'error',
             summary: 'Falha',
             detail: 'Falha ao atualizar'
           });
         }
         else if (data.includes('Online')) {
           this.messageService.add({
             severity: 'success',
             summary: 'Firmware atualizado com sucesso',
             detail: data
           });
         }
       }
     }) */
  }

  ngOnInit(): void {
    this.mqttSevice.observe(`device/confirmacao/a0:a3:b3:76:dc:37`).subscribe((message: any) => {
      if (message.payload instanceof Uint8Array) {
        const decoder = new TextDecoder('utf-8');
        const decodedPayload = decoder.decode(message.payload);

        console.log('Payload decodificado:', this.atualizarPayload);


        try {

          const response = JSON.parse(decodedPayload);
          console.log(response);

          if (response.comando != 'ACEITO')
            if(this.getMessagem(response.comando))
              this.mensagens.push(this.getMessagem(response.comando));
          if (response.comando != 'ATUALIZADO_FIRMWARE'){
            this.atualizarPayload = true;
            this.mensagens.push('Atualização foi concluída')
          }
           if (response.comando == 'ACEITO' && this.atualizarPayload){
            this.mensagens.push('Nova versão ' + response.versao)
            this.atualizarPayload = false;

          }

        } catch (e) {
        }
      }
    });
  }

  getMessagem(comando: string){

    switch(comando){
      case 'FALHA': return 'Falha ao atualizar';
      case 'DOWNLOAD': return 'Fazendo download do arquivo';
      case 'DOWNLOAD_OK': return 'Download foi concluido';
      case 'ATUALIZANDO_FIRMWARE': return 'Fazendo atualização do firmware';
      case 'ATUALIZADO_FIRMWARE': return 'Firmware foi atualizado com sucesso';
    }

    return '';

  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    } else {
      this.selectedFile = null;
    }
  }


  uploadFile(): void {
    if (!this.selectedFile) return;
    if (this.dispositivo?.mac)
      this.comandoService.uploadFirmware(this.dispositivo?.mac, this.selectedFile).subscribe(response => {

        if (this.dispositivo?.mac && response.id) {
          this.atualizarPayload = true;
          this.mensagens.push('Iniciando atualização')
          this.comandoService.updateFirmware(this.dispositivo?.mac).subscribe({
            complete: () => {
              this.mensagens.push('Iniciando atualização')
            },
            error: (err) => {

            }
          });
        }
      })

  }

}
