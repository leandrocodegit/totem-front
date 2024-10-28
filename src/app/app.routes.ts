import { Routes } from '@angular/router';
import { SidebarComponent } from './components/principal/sidebar/sidebar.component';
import { ListaDispositivosComponent } from './components/dispositivos/lista-dispositivos/lista-dispositivos.component';
import { AuthGuard } from './components/auth/services/auth.guard';
import { Role } from './model/constantes/role.enum';
import { LoginComponent } from './components/auth/views/login/login.component';
import { PainelConfiguracoesComponent } from './components/dispositivos/painel-configuracoes/painel-configuracoes.component';

export const routes: Routes = [
  {path: '', component: PainelConfiguracoesComponent},
  {
 //   path: '', component: SidebarComponent, canActivate: [AuthGuard], data: { roles: [Role.admin, Role.user] },
 path: '', component: SidebarComponent,
    children: [
      {
        path: 'dispositivos', component: ListaDispositivosComponent,
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full' },
          { path: "lista", component: ListaDispositivosComponent },
        ]
      },
    ]
  },
  {path: 'login', component: LoginComponent}

];
