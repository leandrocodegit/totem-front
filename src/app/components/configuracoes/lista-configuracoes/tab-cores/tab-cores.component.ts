import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { ListaCoresComponent } from '../lista-cores.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-painel-cores',
  standalone: true,
  imports: [
    MatTabsModule,
    MatCardModule,
    RouterModule,
    ListaCoresComponent,
    NgIf
  ],
  templateUrl: './tab-cores.component.html',
  styleUrl: './tab-cores.component.scss'
})
export class TabCoresComponent implements OnInit {
  protected tabSelect = 0;

  ngOnInit(): void {
    try {
      var tab = Number(sessionStorage.getItem("tab-cores"))!;
      if(tab > 0)
        this.tabSelect = tab;
    } catch (error) {}
  }

  onTabChange(event: MatTabChangeEvent) {
    this.tabSelect = event.index;
    sessionStorage.setItem("tab-cores", this.tabSelect.toString());
  }
}
