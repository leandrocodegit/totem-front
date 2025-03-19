import { Component, Input } from '@angular/core';
import { Parametro } from '../../models/parametro.model';

@Component({
  selector: 'app-label-cor',
  standalone: true,
  imports: [],
  templateUrl: './label-cor.component.html',
  styleUrl: './label-cor.component.scss'
})
export class LabelCorComponent {

  @Input() parametro?: Parametro;

}
