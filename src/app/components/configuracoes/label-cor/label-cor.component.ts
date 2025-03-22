import { Component, Input, OnInit } from '@angular/core';
import { Parametro } from '../../models/parametro.model';
import { Cor } from '../../models/cor.model';

@Component({
  selector: 'app-label-cor',
  standalone: true,
  imports: [],
  templateUrl: './label-cor.component.html',
  styleUrl: './label-cor.component.scss'
})
export class LabelCorComponent implements OnInit {

  @Input() cor?: Cor;
  @Input() parametro?: Parametro;
  @Input() agrupar = false;

  ngOnInit(): void {
   if(this.agrupar && this.cor?.parametros.length == 1){
    this.agrupar = false;
    this.parametro = this.cor.parametros[0];
   }
  }

}
