import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    MatCardModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  ativos: any;
  cores: any;
  conexoes: any;

  options: any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.conexoes = {
        labels: ['Online', 'Offline'],
        datasets: [
            {
                data: [540, 325],
                backgroundColor: ['#23ffa6', '#fd1957'],
                hoverBackgroundColor: ['#23ffa6b6', '#fd1957b6'],
            }
        ]
    };


      this.ativos = {
          labels: ['Ativos', 'Inativos', 'Não associados'],
          datasets: [
              {
                  data: [540, 325, 255],
                  backgroundColor: ['#339fff', '#23ffa6','#bfbfbf'],
                  hoverBackgroundColor: ['#339fffb6', '#23ffa6b6', '#bfbfbfb6'],
              }
          ]
      };

      this.cores = {
        labels: ['Cores'],
        datasets: [
            {
                data: [540, 325, 255],
                backgroundColor: ['#339fff', '#23ffa6', '#fd1957'],
                hoverBackgroundColor: ['#339fffb6', '#23ffa6b6', '#fd1957b6'],
            }
        ]
    };

      this.options = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor
                  }
              }
          }
      };
  }
}