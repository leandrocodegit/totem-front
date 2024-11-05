import { NgModule } from '@angular/core';
 
import { CardMapaCordenadasComponent } from '../card-mapa-cordenadas/card-mapa-cordenadas.component';
import { LeafletModuleStand } from './LeafletModule';

@NgModule({
  declarations:[  
    CardMapaCordenadasComponent
   ],
  imports: [ 
        LeafletModuleStand    
   ],
  exports: [ 
    CardMapaCordenadasComponent
  ]
})
export class MapaModule { }
