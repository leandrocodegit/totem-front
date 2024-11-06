import { Routes } from '@angular/router';
import { SidebarComponent } from './components/principal/sidebar/sidebar.component';
import { ListaDispositivosComponent } from './components/dispositivos/lista-dispositivos/lista-dispositivos.component';
import { LoginComponent } from './components/auth/views/login/login.component';
import { PainelConfiguracoesComponent } from './components/dispositivos/painel-configuracoes/painel-configuracoes.component';
import { UsuariosComponent } from './components/usuarios/views/usuarios.component';
import { ListaUsuariosComponent } from './components/usuarios/views/lista-usuarios/lista-usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PainelDipositivosComponent } from './components/dispositivos/painel-dipositivos/painel-dipositivos.component';
import { TabConfiguracoesComponent } from './components/dispositivos/tab-configuracoes/tab-configuracoes.component';
import { ListaConfiguracoesComponent } from './components/configuracoes/lista-configuracoes/lista-configuracoes.component';
import { ListaAgendaDispositivoComponent } from './components/agendas/lista-agenda-dispositivo/lista-agenda-dispositivo.component';
import { ParamentrosCoresComponent } from './components/dispositivos/paramentros-cores/paramentros-cores.component';
import { ListaConfiguracoesDispositivoComponent } from './components/dispositivos/lista-configuracoes-dispositivo/lista-configuracoes-dispositivo.component';
import { CardConfiguracoesComponent } from './components/configuracoes/lista-configuracoes/card-configuracoes/card-configuracoes.component';
import { ContentMapaComponent } from './components/mapa/content-mapa/content-mapa.component';


export const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    //   path: '', component: SidebarComponent, canActivate: [AuthGuard], data: { roles: [Role.admin, Role.user] },
    path: '', component: SidebarComponent,
    children: [
      {
        path: 'dispositivos', component: PainelDipositivosComponent,
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full' },
          { path: "lista", component: ListaDispositivosComponent },
          { path: "lista/cordenadas/:latitude/:longitude", component: ListaDispositivosComponent },
        ]
      },
      {
        path: "users", component: UsuariosComponent,
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full' },
          { path: "lista", component: ListaUsuariosComponent },
        ]
      },
      {
        path: "dispositivos/configuracoes/:mac", component: PainelConfiguracoesComponent
      },
      {
        path: "dashboard", component: DashboardComponent
      },
      { path: "agendas", component: ListaAgendaDispositivoComponent },
      { path: "configuracoes", component: CardConfiguracoesComponent },
      { path: "mapa", component: ContentMapaComponent }


    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**',  redirectTo: 'dashboard', pathMatch: 'full' },


];
