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
    events: EventItem[] = [];
    options: any;

    constructor(private readonly dashboardService: DashboardService) { }

    data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ],
    };

    ngOnInit() {


        this.dashboardService.recuperarDashboard().subscribe(response => {
            this.dashboard = response;
            this.conexoes = {
                labels: [],
                datasets: [
                    {
                        data: [this.getQuantidadeConexao('Online'), this.getQuantidadeConexao('Offline')],
                        backgroundColor: ['#28d1dd', '#fba58c'],
                        hoverBackgroundColor: ['#23ffa6b6', '#fd1957b6'],
                    }
                ]
            };
        });

        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-check', color: '#30d7dd', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-check', color: '#30d7dd' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-check', color: '#30d7dd' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#30d7dd' }
        ];

        this.options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: false,
                        color: "red"
                    }
                }
            }
        };
    }

    getQuantidadeConexao(conexao: string) {
        if (!this.dashboard) {
            return 0;
        }
        if (conexao) {
            return this.dashboard.dispositivos.filter(device => device.conexao = conexao).length;
        }
        return 0;
    }

    getData(dashboard: DashboardItem) {
        return {
            datasets: [
                {
                    data: dashboard.quantidade,
                    backgroundColor: dashboard.label
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

