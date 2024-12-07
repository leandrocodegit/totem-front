import { Component, Input } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { ComandoService } from '../services/comando.service';
import { response } from 'express';
import { MatButtonModule } from '@angular/material/button';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-atualizar-firmware',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './atualizar-firmware.component.html',
  styleUrl: './atualizar-firmware.component.scss'
})
export class AtualizarFirmwareComponent {

  @Input() dispositivo?: Dispositivo;
  selectedFile: File | null = null;

  constructor(
    private readonly comandoService: ComandoService
  ){}

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

    if(this.dispositivo?.mac)
    this.comandoService.uploadFirmware(this.dispositivo?.mac, this.selectedFile).subscribe(response => {
      console.log('Upload', response.id);

      if(this.dispositivo?.mac && response.id){
        this.comandoService.updateFirmware(this.dispositivo?.mac).subscribe(response => {
          console.log('Atualizando', response.id);
        })
      }

    })
  }

}
