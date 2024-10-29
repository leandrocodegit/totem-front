import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'primeng/chart';
import { IconsModule } from '../../IconsModule';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { NgFor, NgIf } from '@angular/common';


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

    ativos: any;
    cores: any;
    conexoes: any;
    events: EventItem[] = [];
    options: any;


    ngOnInit() {

        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-check', color: '#30d7dd', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-check', color: '#30d7dd' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-check', color: '#30d7dd' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#30d7dd' }
        ];

        this.conexoes = {
            labels: [],
            datasets: [
                {
                    data: [540, 325],
                    backgroundColor: ['#ffd3d3', '#d3ffe7'],
                    hoverBackgroundColor: ['#23ffa6b6', '#fd1957b6'],
                }
            ]
        };



        this.cores = {
            labels: [],
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
                        color: "red"
                    }
                }
            }
        };
    }
}

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}