import { Routes } from '@angular/router';
import { SidebarComponent } from './components/principal/sidebar/sidebar.component';
import { ListaDispositivosComponent } from './components/dispositivos/lista-dispositivos/lista-dispositivos.component';
import { LoginComponent } from './components/auth/views/login/login.component';
import { PainelConfiguracoesComponent } from './components/dispositivos/painel-configuracoes/painel-configuracoes.component';
import { UsuariosComponent } from './components/usuarios/views/usuarios.component';
import { ListaUsuariosComponent } from './components/usuarios/views/lista-usuarios/lista-usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PainelDipositivosComponent } from './components/dispositivos/painel-dipositivos/painel-dipositivos.component';

export const routes: Routes = [
  {path: '', component: PainelConfiguracoesComponent},
  {
 //   path: '', component: SidebarComponent, canActivate: [AuthGuard], data: { roles: [Role.admin, Role.user] },
 path: '', component: SidebarComponent,
    children: [
      {
        path: 'dispositivos', component: PainelDipositivosComponent,
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full' },
          { path: "lista", component: ListaDispositivosComponent },
          { path: "configuracoes/:mac", component: PainelConfiguracoesComponent },
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
        path: "dashboard", component: DashboardComponent
      },
    ]
  },
  {path: 'login', component: LoginComponent},


];
