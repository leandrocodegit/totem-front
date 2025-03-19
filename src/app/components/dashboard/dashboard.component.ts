import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';
import { IconsModule } from '../../IconsModule';
import { TimelineModule } from 'primeng/timeline';
import { DashboardService } from './services/dashboard.service';
import { Dashboard } from '../models/dashboard.model';
import { DashboardItem } from '../models/dashboard-item.model';
import { Comando } from '../models/constantes/comando';
import { FieldsetModule } from 'primeng/fieldset';
import { PrimeNGConfig } from 'primeng/api';
import { AgendaService } from '../dispositivos/services/agenda.service';
import { Agenda } from '../models/agenda.model';
import { PAGE_INIT } from '../models/constantes/PageUtil';
import { ProximasAgendasComponent } from '../agendas/proximas-agendas/proximas-agendas.component';
import { MqttService } from 'ngx-mqtt'; // Importa o serviço MQTT
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MqttAppModule } from 'src/app/mqtt-app.module';
import { NgIf } from '@angular/common';
import { LogService } from '../dispositivos/services/log.service';
import { Log } from '../models/log.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ChartModule,
    MatCardModule,
    IconsModule,
    TimelineModule,
    MatCardModule,
    IconsModule,
    FieldsetModule,
    ProximasAgendasComponent,
    MqttAppModule,
    MatProgressSpinnerModule
  ],
  providers: [
    MqttService
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  dashboard!: Dashboard;
  conexoes: any;
  cores: any;
  agendas: any;
  agendasExecucao: any;
  coresBar: any;
  events: EventItem[] = [];
  options: any;
  protected agenda: Agenda[] = [];
  protected load = false;
  protected logs: Log[] = [];


  constructor(
    private readonly dashboardService: DashboardService,
    private readonly mqttSevice: MqttService,
    private readonly agendaService: AgendaService,
    private readonly logService: LogService,
    private readonly authService: AuthService,
    private primengConfig: PrimeNGConfig) { }

    ngOnInit(): void {
      this.carregarLogs();
    }

  ngAfterViewInit() {

    this.mqttSevice.observe(`dashboard/${this.authService.extrairClienteId}`).subscribe((message: any) => {
      if (message) {
        this.carregarDashboard();
      }
    });

    this.carregarDashboard();
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

  carregarLogs(){
    this.logService.listaTodosLogs().subscribe(response => {
      this.logs = response.content;
    })
  }

  initDashboard() {
    this.load = true;
    this.conexoes = {
      labels: [],
      datasets: [
        {
          data: [this.dashboard.dispositivos.online, this.dashboard.dispositivos.offline],
          backgroundColor: ['#2de09b', '#ff8181']
        }
      ]
    };

    this.agendas = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
        }
      ]
    };

    this.agendasExecucao = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: []
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


    for (let index = 0; index < 24; index++) {
      let quantidade = this.dashboard.logsConexao.find(log => log.comando == Comando.ONLINE && log.hora == index)?.quantidade
      if (quantidade) {
        this.coresBar.datasets[0].data.push(quantidade)
      }
      else {
        this.coresBar.datasets[0].data.push(0)
      }
    }

    for (let index = 0; index < 24; index++) {
      let quantidade = this.dashboard.logsConexao.find(log => log.comando == Comando.OFFLINE && log.hora == index)?.quantidade
      if (quantidade) {
        this.coresBar.datasets[1].data.push(quantidade)
      }
      else {
        this.coresBar.datasets[1].data.push(0)
      }
    }

    if (this.dashboard.cores.length) {
      this.dashboard.cores.forEach(cor => {
        this.cores.datasets[0].data.push(cor.quantidade);
        this.cores.datasets[0].backgroundColor.push(cor.item);
      })
    } else {
      this.cores.datasets[0].data.push(1);
      this.cores.datasets[0].backgroundColor.push('#f0f0f0');
    }

    if (this.dashboard?.agendas?.length) {
      this.dashboard.agendas.forEach(agenda => {
        this.agendas.datasets[0].data.push(agenda.quantidade);
        this.agendas.datasets[0].backgroundColor.push(agenda.item);
      })
    } else {
      this.agendas.datasets[0].data.push(1);
      this.agendas.datasets[0].backgroundColor.push('transparent');
    }

    if (this.dashboard?.agendasExecucao?.length) {
      this.dashboard.agendasExecucao.forEach(agenda => {
        this.agendasExecucao.datasets[0].data.push(agenda.quantidade);
        this.agendasExecucao.datasets[0].backgroundColor.push(agenda.item);
      })
    } else {
      this.agendasExecucao.datasets[0].data.push(1);
      this.agendasExecucao.datasets[0].backgroundColor.push('transparent');

    }
    this.load = false;
  }

  getQuantidadeCores(){
   return  this.dashboard?.cores.map(cor => cor.quantidade)?.reduce((a,b) => a + b);
  }

carregarDashboard(){
  this.agendaService.listaTodosAgendas(undefined, PAGE_INIT).subscribe(response => {
    this.agenda = response.content;
  });
  this.primengConfig.ripple = true;
  this.dashboardService.recuperarDashboard().subscribe(response => {
    this.dashboard = response;
    this.initDashboard();
  });
}

  quantidadeAgendas() {
    if (!this.dashboard?.agendas?.length)
      return 0;
    const validas = this.dashboard.agendas.filter(cor => cor.item != 'transparent');
    if(!validas.length)
      return 0;
    return this.dashboard.agendas.map(agenda => agenda.quantidade).reduce((a, b) => a + b);
  }

  quantidadeAgendasExecucao() {
    if (!this.dashboard.agendasExecucao || !this.dashboard.agendasExecucao.length)
      return 0;
    const validas = this.dashboard.agendasExecucao.filter(cor => cor.item != 'transparent');
    if(!validas.length)
      return 0;
    return this.dashboard.agendasExecucao.map(agenda => agenda.quantidade).reduce((a, b) => a + b);
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

  conectar() {
    this.mqttSevice.connect();

    // Subscreve ao tópico
    this.mqttSevice.observe('topico/teste').subscribe((message) => {
      console.log('Mensagem recebida:', message.payload.toString());
    });
  }

  sendMessage() {
    // Publica uma mensagem no tópico
    this.mqttSevice.unsafePublish('topico/teste', 'Mensagem de teste');
  }
}

interface EventItem {
  status?: string;
  date?: string;
  icon?: string;
  color?: string;
  image?: string;
}

