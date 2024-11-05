import { Component, OnInit } from '@angular/core';
import {  BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IconsModule } from '../../../IconsModule';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/services/auth.service';
import { DispositivoService } from '../../dispositivos/services/dispositivo.service';
import { CardMapaComponent } from '../card-mapa/card-mapa.component';
import { CardItensComponent } from '../card-itens/card-itens.component';

interface sidebarMenu {
  link: string;
  icon: string;
  menu: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    IconsModule,
    NgFor, NgIf, AsyncPipe,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRippleModule,
    MatButtonModule,
    CardMapaComponent,
    CardItensComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  protected search: boolean = false;
  protected nome?: string;
  protected avatar?: string;
  protected padding = "20px";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly dispositivoService: DispositivoService,
    private authService: AuthService,
    private router: Router
  ) {
    dispositivoService.ajutarPadding.subscribe(data => {
      if(router.url.includes('/mapa')){
        this.padding = '0';
      }else{
        this.padding = '20px';
      }
      console.log("PADDING", data);

    })
  }

  ngOnInit(): void {

    if(this.router.url.includes('/mapa')){

    }
  }

  logout(){
    this.authService.logout()
  }

  sincronizar(){
    this.dispositivoService.sincronizarTudo().subscribe(() => {
    }, fail => {
      console.log('Falaha ao sincronizar');
    });
  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/dashboard",
      icon: "layout",
      menu: "Dashboard",
    },
    {
      link: "/users",
      icon: "users",
      menu: "Usuários",
    },
    /*     {
          link: "/formularios",
          icon: "list",
          menu: "Formulários",
        }, */
    {
      link: "/dispositivos",
      icon: "cpu",
      menu: "Dispositivos",
    },
    {
      link: "/agendas",
      icon: "calendar",
      menu: "Agendas",
    },

    {
      link: "/configuracoes",
      icon: "target",
      menu: "Configurações",
    },
    {
      link: "/mapa",
      icon: "map",
      menu: "Mapa",
    },

    /*{
      link: "/menu",
      icon: "lock",
      menu: "Assinatura",
    },
    {
      link: "/table",
      icon: "git-pull-request",
      menu: "Fluxos",
    },
    {
      link: "/expansion",
      icon: "list",
      menu: "Formulários",
    },
    {
      link: "/chips",
      icon: "award",
      menu: "Chips",
    },
    {
      link: "/tabs",
      icon: "list",
      menu: "Tabs",
    },
    {
      link: "/progress",
      icon: "bar-chart-2",
      menu: "Progress Bar",
    },
    {
      link: "/toolbar",
      icon: "voicemail",
      menu: "Toolbar",
    },
    {
      link: "/progress-snipper",
      icon: "loader",
      menu: "Progress Snipper",
    },
    {
      link: "/tooltip",
      icon: "bell",
      menu: "Tooltip",
    },
    {
      link: "/snackbar",
      icon: "slack",
      menu: "Snackbar",
    },
    {
      link: "/slider",
      icon: "sliders",
      menu: "Slider",
    },
    {
      link: "/slide-toggle",
      icon: "layers",
      menu: "Slide Toggle",
    }, */
  ]

}

