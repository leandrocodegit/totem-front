import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { isPlatformBrowser } from '@angular/common';
import { Filtro } from '../../models/constantes/filtro';
import { Router, RouterModule } from '@angular/router';
import * as Leaflet from 'leaflet';
import { MqttService } from 'ngx-mqtt';
import { MqttAppModule } from 'src/app/mqtt-app.module';

@Component({
  selector: 'app-content-mapa',
  standalone: true,
  imports: [
    RouterModule,
    MqttAppModule
  ],
  providers: [
    MqttService
  ],
  templateUrl: './content-mapa.component.html',
  styleUrls: ['./content-mapa.component.scss']
})
export class ContentMapaComponent2 implements OnInit, OnDestroy {

  //protected Leaflet: any;
  protected url = "";
  @Input() cordenadas = {
    lat: -23.73248085966712,
    lng: -46.590306426233894
  }
  @Input() edicao = false;
  @Input() height = '100vh';

  private markers: any[] = [];
  private mapa: any;

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly route: Router,
    private readonly mqttSevice: MqttService,
    @Inject(PLATFORM_ID) private readonly platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      // this.L = Leaflet;
    }
  }

  ngOnInit(): void {

    this.edicao = this.route.url.includes('/dispositivos/lista');

    if (!this.edicao) {
      this.mqttSevice.observe(`dashboard`).subscribe((message: any) => {
        console.log("Atualizando mapa 1");
        this.inicializarMarcadores();
      });
      this.mqttSevice.observe(`mapa`).subscribe((message: any) => {
        console.log("Atualizando mapa 2");
        this.inicializarMarcadores();
      });
    }

    /*     this.activeRoute.params?.subscribe(params => {
          if (params['latitude'] != undefined) {
             this.cordenadas = {
              lat: params['latitude'],
              lng: params['longitude']
             }
             console.log("Cordenadas:", this.cordenadas);

          }
        }) */
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mapa = Leaflet.map('map', {
        crs: Leaflet.CRS.Simple, // Usa um sistema de coordenadas simples (não geográfico)
        minZoom: -2, // Permite zoom para ajustar a imagem
        maxZoom: 2,
        zoomControl: false, // Remove controles de zoom
        attributionControl: false, // Remove créditos
      });
    }
    this.dispositivoService.ajutarPadding.emit();
    this.addCenterButton();

    const imageUrl = '/assets/images/planta.webp';
    const imgWidth = 1024; // Largura da imagem
    const imgHeight = 768; // Altura da imagem

    const bounds: L.LatLngBoundsExpression = [
      [0, 0], // Canto superior esquerdo
      [imgHeight, imgWidth], // Canto inferior direito
    ];

    Leaflet.imageOverlay(imageUrl, bounds).addTo(this.mapa);
    this.mapa.fitBounds(bounds);

    this.adicionarMarcadorEdicao();

    for (let i = 0; i < 10; i++) {
      const position = this.getRandomPosition();
      Leaflet.marker(position).addTo(this.mapa).bindPopup(`Marcador ${i + 1}`);
    }



  }

  getRandomPosition():any {
    const x = Math.random() * 1024; // Número entre 0 e imgWidth
    const y = Math.random() * 768; // Número entre 0 e imgHeight
    return [y, x]; // No Leaflet, a ordem é [latitude, longitude]
  }

  inicializarMarcadores() {
    this.dispositivoService.listaTodosDispositivosFiltroNaoPaginado(Filtro.CORDENADAS).subscribe(response => {
      this.carregarDispositivos(response);
    });
  }

  private adicionarMarcadorEdicao() {
    if (isPlatformBrowser(this.platformId)) {
      this.removerMarcadores();
      let marker = new Leaflet.Marker(this.cordenadas, this.gerarIcon()).addTo(this.mapa);
      this.markers.push(marker);
      marker.on('drag', (event: any) => {
        this.dispositivoService.mapaEdit.emit(event.target.getLatLng());
        this.cordenadas = event.target.getLatLng();
      });
      marker.bindTooltip('Arraste o pino', { permanent: false }).openTooltip();
    }
  }

  private carregarDispositivos(dispositivos: Dispositivo[]) {
    if (isPlatformBrowser(this.platformId)) {
      this.removerMarcadores();
      if (!this.edicao) {
        dispositivos.forEach(device => {
          if (device.latitude && device.longitude)
            if (device.latitude != 0 && device.longitude != 0) { }
          this.add(device)
        });
        if (dispositivos.length) {
          this.centralizar({ lat: dispositivos[0].latitude, lng: dispositivos[0].longitude }, 13)
          this.cordenadas.lat = dispositivos[0].latitude;
          this.cordenadas.lng = dispositivos[0].longitude;
        }
      } else {
        this.dispositivoService.mapaEdit.emit(true)
      }
    }
  }

  addCenterButton() {
    const centerButton = new Leaflet.Control({ position: 'topright' });

    centerButton.onAdd = () => {
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
    centerButton.addTo(this.mapa);
  }

  add(dispositivo: Dispositivo) {
    if (isPlatformBrowser(this.platformId)) {
      let circulo = Leaflet.circle({ lat: dispositivo.latitude, lng: dispositivo.longitude }, {
        weight: 2,
        color: dispositivo.cor.parametros[0].corHexa[0] + 'cc',
        fillColor: dispositivo.cor.parametros[0].corHexa[0] + 'dc',
        fillOpacity: 0.3,
        radius: 150
      }).addTo(this.mapa);

      circulo.bindTooltip(dispositivo.nome, { permanent: true }).openTooltip();
      this.markers.push(circulo);

      var cor = dispositivo.cor.parametros[0];
      var style = '';
      var classe = '';

      if (dispositivo.operacao.modoOperacao == 'TEMPORIZADOR')
        cor = dispositivo.operacao.corTemporizador.parametros[0];
      if (dispositivo.operacao.modoOperacao == 'AGENDA')
        cor = dispositivo.operacao.agenda.cor.parametros[0];

      if (cor.efeito != 'COLORIDO') {
        style = `<style>
        @keyframes mudarCores {
       10% { fill: ${cor.corHexa[0] + 'ac'}; }
       50% { fill: transparent; }
      100% { fill : ${cor.corHexa[1] + 'ac'}}
        }</style>`
        classe = 'alternando-cores';
      }

      circulo.bindPopup(`${style}
        <svg xmlns="http://www.w3.org/2000/svg" height="60px" class="${classe}" viewBox="0 -960 960 960" width="60px" style="fill: ${cor.corHexa[0] + 'ac'};"><path d="M215-755v-151h531v151H215Zm264.65 424q17.35 0 29.85-11.82 12.5-11.83 12.5-29.5 0-17.68-12.15-30.18-12.14-12.5-29.5-12.5-17.35 0-29.85 12.2T438-373.18Q438-355 450.15-343q12.14 12 29.5 12ZM305-55v-451l-90-132v-57h531v57l-90 132v451H305Z"/></svg>
        `, { autoClose: false, closeOnClick: false, autoPan: false }).openPopup();
    }
  }

  removerMarcadores() {
    if (isPlatformBrowser(this.platformId)) {
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
      iconUrl: 'assets/images/tag.gif',
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
    this.edicao = false;
    this.mqttSevice.disconnect();
  }


  onMapClick(event: any) {
    if (this.mapa) {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
    }
  }


}
