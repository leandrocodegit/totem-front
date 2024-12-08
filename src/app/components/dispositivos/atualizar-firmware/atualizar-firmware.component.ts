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
  protected payload: any;
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
      console.log('Mensagens', message.payload);
      if (message.payload instanceof Uint8Array) {
        const decoder = new TextDecoder('utf-8');
        const decodedPayload = decoder.decode(message.payload);

        console.log('Payload decodificado:', decodedPayload);

        try {

          const response = JSON.parse(decodedPayload);
          if(this.atualizarPayload && response.comando != 'ACEITO')
            this.payload = JSON.parse(decodedPayload);

          if(this.payload.comando == 'FALHA', this.payload.comando == 'ATUALIZADO_FIRMWARE'){
            this.atualizarPayload = false;
          }


        } catch (e) {
        }
    } else {
    }

      if (message) {
        this.payload.data = message.comando;
      }
    });
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
          this.comandoService.updateFirmware(this.dispositivo?.mac).subscribe({
            complete: () => {
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Falha',
                detail: 'Falha ao atualizar'
              });
            }
          });
        }
      })

  }

}
