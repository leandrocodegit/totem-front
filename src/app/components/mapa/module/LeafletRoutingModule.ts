// src/app/nome-do-modulo/nome-do-modulo-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentMapaComponent } from '../content-mapa/content-mapa.component';
 
const routes: Routes = [
  { path: '', component: ContentMapaComponent } // Rota padrão para o módulo lazy
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeafletRoutingModule { }
