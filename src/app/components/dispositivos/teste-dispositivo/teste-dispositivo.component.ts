import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { isPlatformBrowser, NgIf } from '@angular/common';


@Component({
  selector: 'app-teste-dispositivo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatProgressBarModule,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './teste-dispositivo.component.html',
  styleUrl: './teste-dispositivo.component.scss'
})
export class TesteDispositivoComponent {

  protected mac: string = '';
  protected iniciarTeste = false;
  protected timeRemaining = 2000;
  private isRunning = false;
  protected isBrowser = signal(false);
  private intervalId: any;
  private index = 0;
  protected cores: any[] = [
    { nome: "Vermelho", cor: "red" },
    { nome: "Verde", cor: "green" },
    { nome: "Azul", cor: "blue" },
    { nome: "Ciano", cor: "#00FFFF" },
    { nome: "Magenta", cor: "#FF00FF" },
    { nome: "Amarelo", cor: "yellow" },
    { nome: "Branco", cor: "white" }
  ];
  protected cor: any;

  constructor(
    private readonly dispositivoService: DispositivoService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser.set(isPlatformBrowser(platformId));
    if (data) {
      this.mac = data;
    }
  }

  testar() {
    this.iniciarTeste = true;
    this.dispositivoService.testar(this.mac).subscribe(() => {
    }, fail => this.iniciarTeste = false);

    this.start();
  }

  start() {

    this.cor = this.cores[this.index];
    if (!this.isRunning && this.isBrowser()) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        if (this.cor.nome != this.cores[this.cores.length - 1].nome) {
          this.index++;
          this.cor = this.cores[this.index];
        } else {
          this.stop();
        }
      }, 2250);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      this.iniciarTeste = false;
      this.index = 0;
      clearInterval(this.intervalId);
    }
  }

}
