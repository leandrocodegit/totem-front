import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Role } from 'src/app/model/constantes/role.enum';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TooltipModule } from 'primeng/tooltip';

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
    ToastModule,
    MatCardModule,
    MatIconModule,
    TooltipModule
  ],
  providers: [
    MessageService
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  protected search: boolean = false;
  protected nome?: string;
  protected avatar?: string;
  protected sidebarMenu: sidebarMenu[] = [];
  protected cliente: any;
  protected modoIcon = false;
  protected reload = false;
  protected width = '97%';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly dispositivoService: DispositivoService,
    private authService: AuthService,
    private readonly messageService: MessageService,
    private router: Router
  ) {
    dispositivoService.ajutarPadding.subscribe(data => {
      this.width = '100%';
    })
  }

  ngOnInit(): void {

    this.modoIcon =  localStorage.getItem('modoIcon') != null && localStorage.getItem('modoIcon') == 'true';

    var interval = setInterval(() => {
      this.cliente = {
        nome: localStorage.getItem('cliente.nome'),
        endereco: localStorage.getItem('cliente.endereco')
      }
      clearInterval(interval);
    }, 3000);


    if (this.router.url.includes('/mapa')) {

    }

    if (this.authService.isAuthorizedRoles([Role.ROLE_ADMIN])) {
      this.sidebarMenu = [
        {
          link: "/dashboard",
          icon: "layout",
          menu: "Dashboard",
        },
        {
          link: "/clientes",
          icon: "award",
          menu: "Clientes",
        },
        {
          link: "/users",
          icon: "users",
          menu: "Usuários",
        },
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
          menu: "Cores",
        },
        {
          link: "/mapa",
          icon: "map",
          menu: "Mapa",
        },
        {
          link: "/integracao",
          icon: "share-2",
          menu: "Integração",
        }
      ]
    } else {
      this.sidebarMenu = [
        {
          link: "/dashboard",
          icon: "layout",
          menu: "Dashboard",
        },
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
          menu: "Cores",
        },
        {
          link: "/mapa",
          icon: "map",
          menu: "Mapa",
        }
      ]
    }
  }

  modo() {
    this.modoIcon = !this.modoIcon;
    localStorage.setItem('modoIcon', this.modoIcon ? 'true' : 'false');
  }

  onMenuClick(sidenav: any) {
    if (window.innerWidth <= 600) {
      sidenav.toggle();
    }
  }

  logout() {
    this.authService.logout()
  }

  sincronizar() {
    this.enviarSincronizar();
  }

  viewCliente() {
    return !this.router.url.includes('mapa');
  }

  private enviarSincronizar() {
    this.dispositivoService.sincronizarTudo().subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Sincronizado',
        detail: 'Comando sincronização enviado'
      });
    }, fail => {
      this.messageService.add({
        severity: 'error',
        summary: 'Falha',
        detail: 'Erro ao enviar comando sincronização'
      });
    })
  }

  routerActive: string = "activelink";

}

