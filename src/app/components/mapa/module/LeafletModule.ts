import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ContentMapaComponent } from '../content-mapa/content-mapa.component';
import { LeafletRoutingModule } from './LeafletRoutingModule';


@NgModule({
  declarations:[ 
    ContentMapaComponent, 
   ],
  imports: [ 
    LeafletModule,
    LeafletRoutingModule    
   ],
  exports: [
    ContentMapaComponent 
  ]
})
export class LeafletModuleStand { }
