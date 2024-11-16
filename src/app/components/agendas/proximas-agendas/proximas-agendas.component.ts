import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Agenda } from '../../models/agenda.model';
import { DatePipe, NgIf } from '@angular/common';
import { AgendaService } from '../../dispositivos/services/agenda.service';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-proximas-agendas',
  standalone: true,
  imports: [
    CarouselModule,
    DatePipe,
    NgIf,
    TooltipModule
  ],
  templateUrl: './proximas-agendas.component.html',
  styleUrl: './proximas-agendas.component.scss'
})
export class ProximasAgendasComponent implements OnInit {

  protected agendas: Agenda[] = [];

  constructor(
    private readonly agendaService: AgendaService
  ){}

  ngOnInit(): void {
    this.agendaService.listaAgendasMesAtual().subscribe(response => {
        this.agendas = response;
    }, fail => {
      console.log("Falaha a carregar agendas do mes atual");

    })
  }


}
