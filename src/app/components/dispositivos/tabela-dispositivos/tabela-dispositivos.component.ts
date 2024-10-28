import { Component, Input } from '@angular/core';
import { IconsModule } from '../../../IconsModule';

@Component({
  selector: 'app-tabela-dispositivos',
  standalone: true,
  imports: [
    IconsModule
  ],
  templateUrl: './tabela-dispositivos.component.html',
  styleUrl: './tabela-dispositivos.component.scss'
})
export class TabelaDispositivosComponent {

  @Input() status = false;

}
