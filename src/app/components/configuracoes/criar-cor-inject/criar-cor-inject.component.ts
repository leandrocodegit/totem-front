import { Component} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CriarCorComponent } from '../criar-cor/criar-cor.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-criar-inject-cor',
  standalone: true,
  imports: [
    MatCardModule,
    CriarCorComponent
  ],
  providers: [
    MessageService
  ],
  template: `<mat-card>
  <mat-card-content>
    <app-criar-cor [apenasCriar]="true"></app-criar-cor>
</mat-card-content>
</mat-card>
`,
})
export class CriarCorInjectComponent { }
