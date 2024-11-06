import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ContentMapaComponent } from '../content-mapa/content-mapa.component';

@Component({
  selector: 'app-card-mapa-cordenadas',
  standalone: true,
  imports: [
    ContentMapaComponent
  ],
  templateUrl: './card-mapa-cordenadas.component.html',
  styleUrl: './card-mapa-cordenadas.component.scss'
})
export class CardMapaCordenadasComponent implements OnInit{

  protected cordenadas = {
    lat: -23.730476198758623,
    lng: -46.58610093766739
  }

  constructor(
    private readonly activeRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private readonly platformId: any) {
      if (isPlatformBrowser(this.platformId)) {
        this.activeRoute.params?.subscribe(params => {
          if (params['latitude'] != undefined) {
             this.cordenadas = {
              lat: params['latitude'],
              lng: params['longitude']
             }
             console.log("Cordenadas:", this.cordenadas);

          }
        })
      }
    }

  ngOnInit(): void {

  }


  fechar(){

  }
  salvar(){

  }

}
