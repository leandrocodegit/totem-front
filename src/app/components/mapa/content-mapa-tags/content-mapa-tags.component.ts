import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { Dispositivo } from '../../models/dispositivo.model';
import { isPlatformBrowser } from '@angular/common';
import { Filtro } from '../../models/constantes/filtro';
import { Router, RouterModule } from '@angular/router';
import * as Leaflet from 'leaflet';
import { MqttService } from 'ngx-mqtt';
import { MqttAppModule } from 'src/app/mqtt-app.module';
import { AuthService } from '../../auth/services/auth.service';
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { title } from 'process';

@Component({
  selector: 'app-content-mapa-tags',
  standalone: true,
  imports: [
    RouterModule,
    MqttAppModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [
    MqttService
  ],
  templateUrl: './content-mapa-tags.component.html',
  styleUrls: ['./content-mapa-tags.component.scss']
})
export class ContentMapaTagsComponent implements OnInit, OnDestroy {

  //protected Leaflet: any;
  protected url = "";
  @Input() cordenadas = {
    lat: 592.008537724163, lng: 1608.0355737985292
  }
  @Input() edicao = false;
  @Input() height = '100vh';
  @Input() tag = false;
  protected tabSelect = 0;
  protected nomeFind = new Subject<any>();

  private markers: any[] = [];
  private itens: Map<string, any> = new Map<string, { marker: any, item: any }>();
  private mapa: any;
  protected planta = '1º Andar';
  protected linhas:any[] = [];
  protected centro:any = {lat: 1092.217748065566, lng: 2812};

  constructor(
    private readonly dispositivoService: DispositivoService,
    private readonly route: Router,
    private readonly mqttSevice: MqttService,
    private readonly authService: AuthService) {

    this.nomeFind
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(value => {
          if (value != undefined && value.length > 2) {

            this.markers.forEach(marker => marker.bindPopup().closePopup())

            const privateItems = Array.from(this.itens.entries()).filter(([key, _]) => key.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())).map(([key, _]) => key);


            if (privateItems.length) {
              const marker = this.itens.get(privateItems[0])
              this.mapa.setView(privateItems.length == 1 ? marker.item.cordenadas : this.centro, privateItems.length == 1 ? -1 : -4, { animate: true, duration: 3 });
              privateItems.forEach((item: any) => {
                const marker = this.itens.get(item)
                this.criarPoupapPesquisa(marker, false);
              })
            }

            return of(value);
          } else if (!value) {
            this.dispositivoService.pesquisa.emit(false);
            return of(null);
          }
          return of(null);
        })
      )
      .subscribe();
  }

  onTabChange(event: MatTabChangeEvent) {
    this.tabSelect = event.index;

  }

  ngOnInit(): void {


  }

  ngAfterViewInit() {


    if (this.tag) {
      console.log('TAG');
      this.mapa = Leaflet.map('overview', {
        crs: Leaflet.CRS.Simple, // Usa um sistema de coordenadas simples (não geográfico)
        minZoom: -2, // Permite zoom para ajustar a imagem
        maxZoom: 2,
        zoomControl: false, // Remove controles de zoom
        attributionControl: false,
        zoom: 21 // Remove créditos
      });
      this.initOverview('planta.webp');
    }


  }

  criarPoupapPesquisa(marker: any, destaque: boolean) {


    marker.marker.bindPopup().closePopup();
    marker.marker.bindPopup(`<div class="box-popup box-color-popup">
    <p class="placa">${marker.item.nome}</p>
    <p class="local">${marker.item.local}</p>
    </div>
    </div>`, { autoClose: false, closeOnClick: false, autoPan: false }).openPopup();

  }

  criarPoupap(data: any, marker: any, destaque: boolean) {


    marker.bindPopup().closePopup();
    marker.bindPopup(`<div class="box-popup box-color-popup">
    <p class="placa">${data.nome}</p>
    <p class="local">${data.local}</p>
    <img width="32" src="assets/icones/${data.icone}"></img>
    <div class="status">
    </div>
    </div>`, { autoClose: true, closeOnClick: false, autoPan: false });

  }

  inicializarMarcadores() {
    this.dispositivoService.listaTodosDispositivosFiltroNaoPaginado(Filtro.CORDENADAS).subscribe(response => {
      this.carregarDispositivos(response);
    });
  }

  selecionarPlanta(item: any) {
    this.initOverview(item.planta);
    this.planta = item.nome;
  }

  initOverview(planta: string) {



    const imageUrl = `/assets/images/${planta}`;
    const imgWidth = 4920; // Largura da imagem
    const imgHeight = 2580; // Altura da imagem

    const bounds: L.LatLngBoundsExpression = [
      [0, 0],
      [imgHeight, imgWidth],
    ];

    Leaflet.imageOverlay(imageUrl, bounds).remove();
    Leaflet.imageOverlay(imageUrl, bounds).addTo(this.mapa);
    this.mapa.fitBounds(bounds);

    const imagens = [
      { nome: "Cadeira 01", local: "Salão", icone: 'cadeira.svg', cordenadas: { lat: 1208.0907133192309, lng: 1608.0355737985292 }, localizacao: { lat: 596.0016372035006, lng: 1599.9964111943132 } },
      { nome: "Cadeira 02", local: "Salão", icone: 'cadeira.svg', cordenadas: { lat: 976.0597640691403, lng: 1311.9039507439713 } },
      { nome: "Cadeira 03", local: "Salão", icone: 'cadeira.svg', cordenadas: { lat: 1452.123263392602, lng: 1315.9057294338977 } },
      { nome: "Cadeira 04", local: "Salão", icone: 'cadeira.svg', cordenadas: {lat: 375.9115910109731, lng: 4435.051749189673} },
      { nome: "Mesa com quatro cadeiras", local: "Salão", icone: 'mesa.svg', cordenadas: { lat: 1220.0923141425114, lng: 1319.9075081238243 } },
      { nome: "Sofa visitantes", local: "Corredor", icone: 'sofa.svg', cordenadas: { lat: 1092.0752386941856, lng: 2028.2223362408072 } },
      { nome: "Televisão 01", local: "Suite", icone: 'tv.svg', cordenadas: {lat: 1672.4420449451343, lng: 4160.004023695094} },
      { nome: "Televisão 02", local: "Quarto 01", icone: 'tv.svg', cordenadas: {lat: 535.990176778997, lng: 3327.863194366827} },
      { nome: "Televisão 03", local: "Quarto 02", icone: 'tv.svg', cordenadas: {lat: 844.1080554310329, lng: 4167.961104280765} },
      { nome: "Panela 01", local: "Cozinha", icone: 'panela.svg', cordenadas: {lat: 1676.4436821486347, lng: 2056.0026824633956} },
      { nome: "Panela 02", local: "Cozinha", icone: 'panela.svg', cordenadas: {lat: 1692.4502309626366, lng: 2207.7988152453336} },
      { nome: "Panela 03", local: "Cozinha", icone: 'panela.svg', cordenadas: {lat: 1700.4535053696377, lng: 2359.7478484408184} },
      { nome: "Panela 04", local: "Cozinha", icone: 'panela.svg', cordenadas: {lat: 1676.4436821486347, lng: 2463.7129764166757} },
      { nome: "Cama 01", local: "Quarto 01", icone: 'cama.svg', cordenadas: {lat: 279.87229812696114, lng: 2907.564099698223} },
      { nome: "Cama 02", local: "quarto 02", icone: 'cama.svg', cordenadas: {lat: 271.8690237199603, lng: 4047.181848664357} },
      { nome: "Furadeira", local: "Area de serviço", icone: 'furadeira.svg', cordenadas: {lat: 2140.6335977546923, lng: 2355.749189672516} },
      { nome: "Notebook", local: "Suite", icone: 'computador.svg', cordenadas: {lat: 1367.9983627964996, lng: 4544} },
      { nome: "Computador recepção", local: "Salão", icone: 'computador.svg', cordenadas: {lat: 1264.2734129845828, lng: 975.9108311853583} },
      { nome: "Computador quarto", local: "Quarto 01", icone: 'computador.svg', cordenadas: {lat: 555.9983627964994, lng: 2520} },
      { nome: "Microondas", local: "Cozinha", icone: 'microondas.svg', cordenadas: {lat: 1471.983627964995, lng: 1948} },
      { nome: "Geladeira", local: "Cozinha", icone: 'geladeira.svg', cordenadas: {lat: 1291.9099538074727, lng: 1936} }]


      //this.adicionarMarcadorEdicao()

      this.linhas.push([imagens[0].cordenadas.lat, imagens[0].cordenadas.lng])



    this.adicionarMarcador({ lat: 596.0016372035006, lng: 1599.9964111943132 }, {lat: 940.1424367045433, lng: 3260.41695303551}, true);
    this.adicionarMarcador({ lat: 559.9869023719962, lng: 2920.5885641326477 }, {lat: 944.1440739080438, lng: 3596.501757042732}, true);
    this.adicionarMarcador({ lat: 579.9950883894985, lng: 4053.0963801373405 }, {lat: 1044.1850039955561, lng: 3760.5431494748286}, false);
    this.adicionarMarcador({ lat: 1372.319254682597, lng: 4205.164567445391 }, {lat: 0, lng: 0}, false);
    this.adicionarMarcador({ lat: 1492.3683707876119, lng: 3528.86131336485 }, {lat: 0, lng: 0}, false);
    this.adicionarMarcador({ lat: 1492.3683707876119, lng: 3096.667517857759 }, {lat: 0, lng: 0}, false);
    this.adicionarMarcador({ lat: 1512.3765568051144, lng: 2324.3211981089753 }, {lat: 0, lng: 0}, false);
    this.adicionarMarcador({ lat: 2136.6319605511917, lng: 1776.0753649194244 }, {lat: 0, lng: 0}, false);
    this.adicionarMarcador({ lat: 1272.2783245950845, lng: 471.49038959246354 }, {lat: 0, lng: 0}, false);

    this.linhas.push([579.9950883894985, 4053.0963801373405])
    this.linhas.push([375.9115910109731, 4435.051749189673])



    imagens.forEach(item => {
      let marker = new Leaflet.Marker(item.cordenadas, this.gerarIcon(32, item.icone)).addTo(this.mapa);
      this.itens.set(item.nome, { marker: marker, item: item })
      this.criarPoupap(item, marker, true);
      this.markers.push(marker);

    })

    var origem = Leaflet.circle([imagens[0].cordenadas.lat, imagens[0].cordenadas.lng], {
      weight: 5,
      fillColor: "#8a00ffb0",
      color: "#8a00ffb0",
      fillOpacity: 0,
      opacity: 0.5, // Opacidade do preenchimento
      radius: 50, // Raio em metros
    }).addTo(this.mapa);

this.criarPoupapPonto(origem);

var destino = Leaflet.circle([375.9115910109731, 4435.051749189673], {
  weight: 5,
  fillColor: "#8a00ffb0",
  color: "#8a00ffb0",
  fillOpacity: 0,
  opacity: 0.5,
  radius: 50,
}).addTo(this.mapa);

this.criarPoupapPonto(destino, true);

      const polyline = Leaflet.polyline(this.linhas, {
        color: "#8a00ff96",
        weight: 10,
        opacity: 0.5,
        fill: false
      }).addTo(this.mapa);


  }

  criarPoupapPonto(marker: any, destino?: boolean) {

    marker.bindPopup(`<div class="box-popup box-color-popup-rota">
    <p class="placa">${destino ? 'Destino' : 'Origem'}</p>
    <div class="status">
    </div>
    </div>`, { autoClose: false, closeOnClick: false, autoPan: false }).openPopup();
  }

  getRandomPosition(): any {
    const x = Math.random() * 1024; // Número entre 0 e imgWidth
    const y = Math.random() * 768; // Número entre 0 e imgHeight
    return [y, x]; // No Leaflet, a ordem é [latitude, longitude]
  }

  private adicionarMarcadorEdicao() {
    this.removerMarcadores();
    let marker = new Leaflet.Marker(this.cordenadas, this.gerarIcon(92)).addTo(this.mapa);
    this.markers.push(marker);
    marker.on('drag', (event: any) => {
      this.dispositivoService.mapaEdit.emit(event.target.getLatLng());
      this.cordenadas = event.target.getLatLng();
      console.log(this.cordenadas);

    });
  }



  private adicionarMarcador(cordenadas: any, porta: any, incluir: boolean) {
    if(incluir){
      this.linhas.push([porta.lat, porta.lng])
    }

    let marker = new Leaflet.Marker(cordenadas, this.gerarIcon(64)).addTo(this.mapa);
    this.markers.push(marker);
    marker.on('drag', (event: any) => {
      console.log(event.target.getLatLng());
    });
  }

  private carregarDispositivos(dispositivos: Dispositivo[]) {
      this.removerMarcadores();
      if (!this.edicao) {
        dispositivos.forEach(device => {
          if (device.conexao.latitude && device.conexao.longitude)
            if (device.conexao.latitude != 0 && device.conexao.longitude != 0) { }
          this.add(device)
        });
        if (dispositivos.length) {
          this.centralizar({ lat: dispositivos[0].conexao.latitude, lng: dispositivos[0].conexao.longitude }, 13)
          this.cordenadas.lat = dispositivos[0].conexao.latitude;
          this.cordenadas.lng = dispositivos[0].conexao.longitude;
        }
      } else {
        this.dispositivoService.mapaEdit.emit(true)
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
      let circulo = Leaflet.circle({ lat: dispositivo.conexao.latitude, lng: dispositivo.conexao.longitude }, {
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

  removerMarcadores() {
      this.markers.forEach(marker => {
        this.mapa.removeLayer(marker)
      })
      this.markers = [];
  }

  centralizar(localizacao: { lat: number, lng: number }, zoom: number) {
      this.mapa.setView(localizacao, zoom, { animate: true, duration: 3 });
  }

  private gerarIcon(wh: number, icone?: string): any {

    var icon = Leaflet.icon({
      iconUrl: icone ? 'assets/icones/' + icone : 'assets/images/tag.gif',
      iconSize: [wh, wh]
    });

    return {
      draggable: true,
      icon: icon,
      opacity: 0.8,
      autopan: false
    }
  }


  ngOnDestroy(): void {
    this.dispositivoService.ajutarPadding.emit(true);
    this.edicao = false;
    this.mqttSevice.disconnect();
    if (this.mapa) {
      // this.mapa.remove();
    }
  }


  onMapClick(event: any) {
    if (this.mapa) {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
    }
  }
}
