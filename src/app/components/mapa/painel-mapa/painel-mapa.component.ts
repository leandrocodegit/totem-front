import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { ContentMapaComponent } from '../content-mapa/content-mapa.component';
import { NgIf } from '@angular/common';
import { ContentMapaTagsComponent } from '../content-mapa-tags/content-mapa-tags.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-painel-mapa',
  standalone: true,
  imports: [
    MatTabsModule,
    ContentMapaComponent,
    ContentMapaTagsComponent,
    MatProgressSpinnerModule,
    NgIf,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './painel-mapa.component.html',
  styleUrl: './painel-mapa.component.scss'
})
export class PainelMapaComponent implements OnInit {

  protected tabSelect = -1;
  protected load = true;



  ngOnInit(): void {
    console.log('Painel');

    if(this.tabSelect == -1)
    var intervalo = setInterval(() => {
      this.tabSelect = 0;
      this.load = false;
      clearInterval(intervalo);
    }, 1000);
  }

  onTabChange(event: MatTabChangeEvent) {
    this.load = true;
    var intervalo = setInterval(() => {
      clearInterval(intervalo);
      this.tabSelect = event.index;
    }, 300);

      var intervaloLoad = setInterval(() => {
        this.load = false;
        clearInterval(intervaloLoad);
      }, 500);

    console.log('Tab', this.tabSelect, event.index);

  }

  showLoad(value: boolean){



    this.load = value;
    console.log('showLoad', this.load);

  }
}
