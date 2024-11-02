import { Component } from '@angular/core';
import { ListaConfiguracoesComponent } from '../lista-configuracoes.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-configuracoes',
  standalone: true,
  imports: [
    ListaConfiguracoesComponent,
    MatCardModule
  ],
  templateUrl: './card-configuracoes.component.html',
  styleUrl: './card-configuracoes.component.scss'
})
export class CardConfiguracoesComponent {

}
