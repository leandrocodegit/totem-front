import { Component, Input, OnInit } from '@angular/core';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-informacoes-dispositivo',
  standalone: true,
  imports: [
        MatCardModule
  ],
  templateUrl: './informacoes-dispositivo.component.html',
  styleUrl: './informacoes-dispositivo.component.scss'
})
export class InformacoesDispositivoComponent implements OnInit{

  @Input() dispositivo?: Dispositivo;

  ngOnInit(): void {
    console.log("Device", this.dispositivo);

  }

}
