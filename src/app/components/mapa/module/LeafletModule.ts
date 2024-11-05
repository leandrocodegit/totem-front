import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ContentMapaComponent } from '../content-mapa/content-mapa.component';
import { LeafletRoutingModule } from './LeafletRoutingModule';
import { IconsModule } from 'src/app/IconsModule';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CardMapaCordenadasComponent } from '../card-mapa-cordenadas/card-mapa-cordenadas.component';

@NgModule({
  declarations:[ 
    ContentMapaComponent 
    
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
