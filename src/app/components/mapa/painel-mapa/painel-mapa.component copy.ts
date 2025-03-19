import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ContentMapaComponent } from '../content-mapa/content-mapa.component';
import { NgIf } from '@angular/common';
import { ContentMapaTagsComponent } from '../content-mapa-tags/content-mapa-tags.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-painel-mapa',
  standalone: true,
  imports: [
    ContentMapaComponent,
    ContentMapaTagsComponent,
    MatProgressSpinnerModule,
    NgIf,
    MatIconModule,
    MatInputModule,
    TabMenuModule
  ],
  templateUrl: './painel-mapa.component.html',
  styleUrl: './painel-mapa.component.scss'
})
export class PainelMapaComponent2 implements OnInit {

  protected tabSelect:any = -1;
  protected load = false;
  protected activeItem: MenuItem | undefined;
  protected items: MenuItem[] = [
    { label: 'Leds', icon: 'pi pi-map' },
    { label: 'Tags', icon: 'pi pi-tags' }
];


  ngOnInit(): void {
    this.activeItem = this.items[0];
    console.log('Painel');

    if(this.tabSelect == -1)
    var intervalo = setInterval(() => {
      this.tabSelect = 0;
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

  onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
      console.log('activeItem', this.activeItem);
}

  showLoad(value: boolean){



    this.load = value;
    console.log('showLoad', this.load);

  }
}
