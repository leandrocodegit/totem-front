import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { isPlatformBrowser } from '@angular/common';
import { Filtro } from '../../models/constantes/filtro';
import { WebSocketService2 } from '../../../broker/websocket2.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-content-mapa', 
  templateUrl: './content-mapa.component.html',
  styleUrls: ['./content-mapa.component.scss']
})
export class ContentMapaComponent implements OnInit, OnDestroy {

  //protected Leaflet: any;
  protected url = "";
  @Input() cordenadas = {
    lat: -23.548789385634088,
    lng: -46.63357944308231
  }

  private markers: any[] = [];
  private mapa: any;
  protected mapaEdit = false;

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly websocketService: WebSocketService2,
    private readonly router: Router,
    private activeRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private readonly platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      // this.L = Leaflet;
    }

    this.url = router.url;

    dispositivoService.mapaEdit.subscribe(data => {
      if (data) {
        if (data.lat && data.lng) {
          //this.cordenadas = data;
          //this.adicionarMarcadorEdicao();
          // this.centralizar(this.cordenadas, 15);
        }

      }
    })


    websocketService.dispositivosEmit.subscribe(data => {
      if (data) {
        this.carregarDispositivos(data);
        console.log("Data", data);

      }
    })
  }

  ngOnInit(): void {
    this.activeRoute.params?.subscribe(params => {
      if (params['edit'] != undefined) {
         console.log(params['edit']);         
      }
    })
  }

   ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mapa = Leaflet.map('map').setView(this.cordenadas, 13);
      Leaflet.tileLayer('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png', {
        maxZoom: 19,
      }).addTo(this.mapa);
      if (!this.url.includes('/mapa')) {
        this.mapaEdit = true
        this.adicionarMarcadorEdicao();
      } else {
        this.dispositivoService.listaTodosDispositivosFiltroNaoPaginado(Filtro.CORDENADAS).subscribe(response => {
          this.carregarDispositivos(response);
        });
      }
    }
    this.dispositivoService.ajutarPadding.emit();
    this.addCenterButton();
  } 

  private adicionarMarcadorEdicao() {
    if (isPlatformBrowser(this.platformId)) {
    this.removerMarcadores();
    let marker = new Leaflet.Marker(this.cordenadas, this.gerarIcon()).addTo(this.mapa);
    this.markers.push(marker);
    marker.on('drag', (event: any) => {
      this.dispositivoService.mapaEdit.emit(event.target.getLatLng());
    });
    marker.bindTooltip('Arraste o pino', { permanent: false }).openTooltip();
  }
  }


  private carregarDispositivos(dispositivos: Dispositivo[]) {
    if (isPlatformBrowser(this.platformId)) {
    console.log("Atualizando mapa");
    this.removerMarcadores();
    if (!this.mapaEdit) {
      dispositivos.forEach(device => {
        if (device.latitude && device.longitude)
          this.add(device)
      });
      if (dispositivos.length) {
        this.centralizar({ lat: dispositivos[0].latitude, lng: dispositivos[0].longitude }, 13)
        this.cordenadas = { lat: dispositivos[0].latitude, lng: dispositivos[0].longitude };
      }
    } else {
      this.dispositivoService.mapaEdit.emit(true)
    }}
  }

  addCenterButton() {
    //const centerButton = Leaflet.control({ position: 'topright' });

/*     centerButton.onAdd = () => {
      const button = Leaflet.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
      button.innerHTML = '🔄 Centralizar';
      button.style.backgroundColor = 'white';
      button.style.width = '100px';
      button.style.height = '30px';

      button.onclick = () => {
        this.mapa.setView(this.cordenadas, 14);
      };

      return button;
    };

    centerButton.addTo(this.mapa); */
  }



  add(dispositivo: Dispositivo) {
    if (isPlatformBrowser(this.platformId)) {
    let circulo = Leaflet.circle({ lat: dispositivo.latitude, lng: dispositivo.longitude }, {
      weight: 2,
      color: dispositivo.configuracao.primaria + 'cc',
      fillColor: dispositivo.configuracao.primaria + 'dc',
      fillOpacity: 0.3,
      radius: 150
    }).addTo(this.mapa);

    circulo.bindTooltip(dispositivo.nome, { permanent: true }).openTooltip();
    this.markers.push(circulo);

    circulo.bindPopup(`
        <svg xmlns="http://www.w3.org/2000/svg" height="60px" viewBox="0 -960 960 960" width="60px" fill="${dispositivo.configuracao.primaria + 'ac'}"><path d="M215-755v-151h531v151H215Zm264.65 424q17.35 0 29.85-11.82 12.5-11.83 12.5-29.5 0-17.68-12.15-30.18-12.14-12.5-29.5-12.5-17.35 0-29.85 12.2T438-373.18Q438-355 450.15-343q12.14 12 29.5 12ZM305-55v-451l-90-132v-57h531v57l-90 132v451H305Z"/></svg>
        `, { autoClose: false, closeOnClick: false, autoPan: false }).openPopup();
    }
  }

  removerMarcadores() {
    if (isPlatformBrowser(this.platformId)) {
    console.log("Markers", this.markers);

    this.markers.forEach(marker => {
      this.mapa.removeLayer(marker)
    })
    this.markers = [];
  }
  }

  centralizar(localizacao: { lat: number, lng: number }, zoom: number) {
    if (isPlatformBrowser(this.platformId)) {
    this.mapa.setView(localizacao, zoom, { animate: true, duration: 3 });
    }
  }

  private gerarIcon(): any {
    var wh = 60

    if (window.innerWidth <= 600)
      wh = 80

    var icon = Leaflet.icon({
      iconUrl: 'assets/images/pin.png',
      iconSize: [wh, wh]
    });

    return {
      draggable: true,
      icon: icon,
      opacity: 0.8,
      autopan: false
    }
  }

  reloadMap() {

    localStorage.setItem("center", JSON.stringify(this.mapa.getCenter()))
    localStorage.setItem("zoom", this.mapa.getZoom())

    if (localStorage.getItem("mapa") != null) {
      //  this.mapa.removeLayer(this.mapa.tileLayer);
      if (localStorage.getItem("mapa") == "open") {
        Leaflet.tileLayer("https://mt3.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga", {
          attribution: '© Google',
          maxZoom: 21,
        },).addTo(this.mapa)
        localStorage.setItem("mapa", "google")
      }
      else if (localStorage.getItem("mapa") == "google") {
        Leaflet.tileLayer("https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png", {
          attribution: '© <a target="_top" rel="noopener" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a target="_top" rel="noopener" href="https://carto.com/attribution">CARTO</a>',
          maxZoom: 19,
        },).addTo(this.mapa);
        localStorage.setItem("mapa", "open")
      }
    }

    location.reload();
  }

  private initMap(): void {

    var localizacao = {
      lat: -23.734646781467035,
      lng: -46.59104781183555
    }
    var zoom = 14

    if (localStorage.getItem("center") != null && localStorage.getItem("zoom") != null) {

      localizacao = JSON.parse(localStorage.getItem("center")!)
      zoom = Number.parseInt(localStorage.getItem("zoom")!)

    }


    if (localStorage.getItem("mapa") != null && localStorage.getItem("mapa") == "google") {
      Leaflet.tileLayer("https://mt3.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga", {
        attribution: '© Google',
        maxZoom: 21,
      },).addTo(this.mapa)
      this.mapa.setMaxZoom(21)
    }
    else if (localStorage.getItem("mapa") == null || localStorage.getItem("mapa") == "open") {
      Leaflet.tileLayer("https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png", {
        attribution: '© <a target="_top" rel="noopener" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a target="_top" rel="noopener" href="https://carto.com/attribution">CARTO</a>',
        maxZoom: 18,
      },).addTo(this.mapa);
      this.mapa.setMaxZoom(18)
    }

    Leaflet.control.zoom({ position: 'topright' }).addTo(this.mapa);

  }






  ngOnDestroy(): void {
    this.dispositivoService.ajutarPadding.emit(true);
    this.mapaEdit = false;
  }


  onMapClick(event: any) {
    if (this.mapa) {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
    }
  }


}
