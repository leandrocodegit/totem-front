import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ListaCoresComponent } from '../lista-cores.component';

@Component({
  selector: 'app-painel-cores',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    RouterModule,
    ListaCoresComponent
  ],
  templateUrl: './painel-cores.component.html',
  styleUrl: './painel-cores.component.scss'
})
export class PainelCoresComponent {

  protected tabSelect = 2;
  onTabChange(event: MatTabChangeEvent) {
  }
}
