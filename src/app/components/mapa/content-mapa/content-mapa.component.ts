import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-content-mapa',
  templateUrl: './content-mapa.component.html',
  styleUrls: ['./content-mapa.component.scss']
})
export class ContentMapaComponent implements OnInit, OnDestroy, AfterViewInit {

  protected Leaflet: any;
  protected center = {
    lat: -23.730476198758623,
    lng: -46.58610093766739
  }

  private markers: any
  private mapa: any;

  constructor(
    protected dispositivoService: DispositivoService,
    @Inject(PLATFORM_ID) private platformId: any) {
    if (isPlatformBrowser(this.platformId)) {
      // this.L = Leaflet;
    }
  }

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.Leaflet = await import('leaflet');
      this.mapa = this.Leaflet.map('map').setView(this.center, 13);
      this.Leaflet.tileLayer('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png', {
        maxZoom: 19,
      }).addTo(this.mapa);
    }
  }


  ngOnInit(): void {
    //this.initMap();
    this.dispositivoService.ajutarPadding.emit();
  }

  add() {


    let circulo = this.Leaflet.circle(this.center, {
      weight: 2,
      color: '#50a2f7' + 'cc',
      fillColor: '#50a2f7',
      fillOpacity: 0.3,
      radius: 150
    }).addTo(this.mapa);




    circulo.bindPopup(`
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#50a2f7"><path d="M215-755v-151h531v151H215Zm264.65 424q17.35 0 29.85-11.82 12.5-11.83 12.5-29.5 0-17.68-12.15-30.18-12.14-12.5-29.5-12.5-17.35 0-29.85 12.2T438-373.18Q438-355 450.15-343q12.14 12 29.5 12ZM305-55v-451l-90-132v-57h531v57l-90 132v451H305Z"/></svg>
        `, { autoClose: false, closeOnClick: false, autoPan: false }).openPopup();
  }

  adicionarDevices(devices: Dispositivo[]) {
    devices.forEach((it: Dispositivo) => {
      // this.criarDevice(it)
    });
  }


  removerMarcadores() {
    /*  this.markers.forEach(marker => {
       if (marker.marker)
         this.mapa.removeLayer(marker.marker)
     })
     this.markers.clear() */
  }

  centralizar(localizacao: { lat: number, lng: number }, zoom: number) {
    this.mapa.setView(localizacao, zoom, { animate: true, duration: 3 });
  }

  private gerarIcon(): any {
    var wh = 60

    if (window.innerWidth <= 600)
      wh = 80

    var icon = this.Leaflet.icon({
      iconUrl: 'host',
      iconSize: [wh, wh]
    });

    return {
      draggable: false,
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
        this.Leaflet.tileLayer("https://mt3.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga", {
          attribution: '© Google',
          maxZoom: 21,
        },).addTo(this.mapa)
        localStorage.setItem("mapa", "google")
      }
      else if (localStorage.getItem("mapa") == "google") {
        this.Leaflet.tileLayer("https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png", {
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
      this.Leaflet.tileLayer("https://mt3.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga", {
        attribution: '© Google',
        maxZoom: 21,
      },).addTo(this.mapa)
      this.mapa.setMaxZoom(21)
    }
    else if (localStorage.getItem("mapa") == null || localStorage.getItem("mapa") == "open") {
      this.Leaflet.tileLayer("https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png", {
        attribution: '© <a target="_top" rel="noopener" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a target="_top" rel="noopener" href="https://carto.com/attribution">CARTO</a>',
        maxZoom: 18,
      },).addTo(this.mapa);
      this.mapa.setMaxZoom(18)
    }

    this.Leaflet.control.zoom({ position: 'topright' }).addTo(this.mapa);

  }






  ngOnDestroy(): void {
    this.dispositivoService.ajutarPadding.emit(true);
  }


  onMapClick(event: any) {
    if (this.mapa) {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
    }
  }


}
