import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';
import { IconsModule } from '../../IconsModule';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { NgFor, NgIf } from '@angular/common';
import { DashboardService } from './services/dashboard.service';
import { Dashboard } from '../models/dashboard.model';
import { response } from 'express';
import { DashboardItem } from '../models/dashboard-item.model';
import { WebSocketService2 } from '../../broker/websocket2.service';
import { Comando } from '../models/constantes/comando';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    MatCardModule,
    IconsModule,
    TimelineModule,
    MatCardModule,
    CardModule,
    NgIf, NgFor
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  dashboard!: Dashboard;
  conexoes: any;
  cores: any;
  coresBar: any;
  events: EventItem[] = [];
  options: any;

  constructor(
    private readonly dashboardService: DashboardService,
    private readonly webSocketService: WebSocketService2) {

      webSocketService.dashboardEmit.subscribe(response => {
        if(response){
          try {
            this.dashboard = JSON.parse(response);
            this.initDashboard();
          } catch (error) {}
        }
      })
    }

  ngOnInit() {
    this.dashboardService.recuperarDashboard().subscribe(response => {
      this.dashboard = response;
      this.initDashboard();
    });

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: 'green'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: 'red'
              },
              grid: {
                  color: 'red',
                  drawBorder: false
              }
          },
          y: {
              ticks: {
                  color: 'red'
              },
              grid: {
                  color: 'red',
                  drawBorder: false
              }
          }
      }
  };


    this.options = {
      responsive: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: true
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      }
    };
  }

  initDashboard(){
    this.conexoes = {
      labels: [],
      datasets: [
        {
          data: [this.getQuantidadeConexao('Online'), this.getQuantidadeConexao('Offline')],
          backgroundColor: ['#2de09b', '#ff8181']
        }
      ]
    };

    this.cores = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ]
    };

    this.coresBar = {
      labels: this.dashboard.cores.map(cor => cor.item),
      datasets: []
    };

    this.coresBar.datasets.push(
      {
        label: 'Cores utilizadas',
        data: this.dashboard.cores.map(cor => cor.quantidade),
        backgroundColor: this.dashboard.cores.map(cor => cor.item),
        borderWidth: 1
      }
    );

    this.coresBar = {
      labels: [this.dashboard.logsConexao.map(log => log.hora + "h")],
      datasets: []
  };

  this.coresBar = {
    labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00",
                "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
                "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    datasets: [
      {
        label: 'Online',
        data: [],
        fill: false,
        borderColor: '#057b05',
        tension: 0.4
    },
    {
        label: 'Offline',
        data: [],
        fill: false,
        borderColor: 'red',
        tension: 0.4
    }
    ]
};

console.log(this.coresBar);



for (let index = 0; index < 24; index++) {
  if(this.dashboard.logsConexao.find(log => log.comando == Comando.ONLINE && log.hora == index)){
    this.coresBar.datasets[0].data.push(this.dashboard.logsConexao.find(log => log.comando == Comando.ONLINE && log.hora == index)?.quantidade)
  }
else{
  this.coresBar.datasets[0].data.push(0)
}
}

for (let index = 0; index < 24; index++) {
  if(this.dashboard.logsConexao.find(log => log.comando == Comando.OFFLINE && log.hora == index)){
    this.coresBar.datasets[1].data.push(0)
  }
else{
  this.coresBar.datasets[1].data.push(0)
}
}

    this.dashboard.cores.forEach(cor => {
      this.cores.datasets[0].data.push(cor.quantidade);
      this.cores.datasets[0].backgroundColor.push(cor.item);
    })
  }

  getQuantidadeConexao(conexao: string) {
    if (!this.dashboard) {
      return 0;
    }
    if (conexao) {
      return this.dashboard.dispositivos.filter(device => device.conexao == conexao).length;
    }
    return 0;
  }

  getData(dashboard: DashboardItem) {
    return {
      datasets: [
        {
          data: dashboard.quantidade,
          backgroundColor: dashboard.item
        }
      ]
    }
  }
}

interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}

