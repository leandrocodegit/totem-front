import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ContentMapaComponent } from '../content-mapa/content-mapa.component';
import { LeafletRoutingModule } from './LeafletRoutingModule';
import { IconsModule } from 'src/app/IconsModule';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations:[ 
    ContentMapaComponent, 
   ],
  imports: [ 
    LeafletModule,
    LeafletRoutingModule,
    IconsModule,
    MatButtonModule,
    RouterModule  
   ],
  exports: [
    ContentMapaComponent 
  ]
})
export class MapaModule { }
