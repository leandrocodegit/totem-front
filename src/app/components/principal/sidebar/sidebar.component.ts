import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { IconsModule } from '../../../IconsModule';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/services/auth.service';

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
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  protected search: boolean = false;
  protected nome?: string;
  protected avatar?: string;
  protected host = 'environment';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.avatar);

  /*   if(localStorage.getItem('user.nome'))
      this.nome = localStorage.getItem('user.nome')!;
    if(localStorage.getItem('user.avatar'))
      this.avatar = localStorage.getItem('user.avatar')!; */
  }

  logout(){
    this.authService.logout()
  }

  routerActive: string = "activelink";

  sidebarMenu: sidebarMenu[] = [
    {
      link: "/painel/dashboard",
      icon: "layout",
      menu: "Dashboard",
    },
    {
      link: "/painel/users",
      icon: "users",
      menu: "Usuários",
    },
    /*     {
          link: "/formularios",
          icon: "list",
          menu: "Formulários",
        }, */
    {
      link: "/painel/documentos",
      icon: "file-text",
      menu: "Documentos",
    },
    {
      link: "/painel/modelos",
      icon: "layers",
      menu: "Modelos",
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

