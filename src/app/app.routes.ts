import { Routes } from '@angular/router';
import { SidebarComponent } from './components/principal/sidebar/sidebar.component';
import { ListaDispositivosComponent } from './components/dispositivos/lista-dispositivos/lista-dispositivos.component';
import { LoginComponent } from './components/auth/views/login/login.component';
import { PainelConfiguracoesComponent } from './components/dispositivos/painel-configuracoes/painel-configuracoes.component';
import { UsuariosComponent } from './components/usuarios/views/usuarios.component';
import { ListaUsuariosComponent } from './components/usuarios/views/lista-usuarios/lista-usuarios.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PainelDipositivosComponent } from './components/dispositivos/painel-dipositivos/painel-dipositivos.component';
import { ListaAgendaDispositivoComponent } from './components/agendas/lista-agenda-dispositivo/lista-agenda-dispositivo.component';
import { CardConfiguracoesComponent } from './components/configuracoes/lista-configuracoes/card-cores/card-cores.component';
import { ContentMapaComponent } from './components/mapa/content-mapa/content-mapa.component';
import { DetalhesDispositivoComponent } from './components/dispositivos/detalhes-dispositivo/detalhes-dispositivo.component';
import { UploadComponent } from './components/principal/upload/upload.component';
import { PerfilUsuarioComponent } from './components/usuarios/views/perfil-usuario/perfil-usuario.component';
import { SicronizarDipositivosComponent } from './components/sincronizar/sicronizar-dipositivos/sicronizar-dipositivos.component';
import { ClientesComponent } from './components/integracao/clientes/clientes.component';
import { ListaRapidasComponent } from './components/configuracoes/lista-rapidas/lista-rapidas.component';
import { ListaParametrosComponent } from './components/configuracoes/lista-parametros/lista-parametros.component';
import { PainelCoresComponent } from './components/configuracoes/painel-cores/painel-cores.component';
import { CriarCorComponent } from './components/configuracoes/criar-cor/criar-cor.component';
import { PainelClienteComponent } from './components/clientes/painel-cliente/painel-cliente.component';
import { ListaClientesComponent } from './components/clientes/lista-clientes/lista-clientes.component';
import { FormularioClienteComponent } from './components/clientes/formulario-cliente/formulario-cliente.component';
import { PainelMapaComponent } from './components/mapa/painel-mapa/painel-mapa.component';
import { DebugComponent } from './components/dispositivos/debug/debug.component';


export const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: SidebarComponent,
    children: [
      {
        path: 'clientes', component: PainelClienteComponent,
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full' },
          { path: "lista", component: ListaClientesComponent },
          { path: "lista/:id", component: FormularioClienteComponent },
        ]
      },
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
          { path: 'lista', component: ListaUsuariosComponent }
        ]
      },
      {
        path: "dispositivos/configuracoes/:id", component: PainelConfiguracoesComponent
      },
      {
        path: "dispositivos/configuracoes/:id/:tab", component: PainelConfiguracoesComponent
      },
      {
        path: "dashboard", component: DashboardComponent
      },
      { path: "agendas", component: ListaAgendaDispositivoComponent },
      { path: "comandos/:id", component: ListaRapidasComponent },
      { path: "configuracoes", component: PainelCoresComponent,
        children: [
        { path: '', component: CardConfiguracoesComponent },
        { path: 'nova', component: CriarCorComponent },
        { path: ':cor', component: CriarCorComponent },
        { path: 'parametros/:cor', component: ListaParametrosComponent }
      ]},
      { path: "mapa", component: PainelMapaComponent },
      { path: "detalhes", component: DetalhesDispositivoComponent },
      { path: 'perfil', component: PerfilUsuarioComponent},
      {path: 'sincronizar', component: SicronizarDipositivosComponent},
      {path: 'integracao', component: ClientesComponent},
    ],
  },
  { path: 'debug/:id',component: DebugComponent },
  { path: 'login', component: LoginComponent },
  { path: '**',  redirectTo: 'dashboard', pathMatch: 'full' },


];
