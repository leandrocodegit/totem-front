import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations:[
   ],
  imports: [
    FeatherModule.pick(allIcons),
   ],
  exports: [
    FeatherModule,
  ],
  providers: [
  //  provideMomentDateAdapter(MY_FORMATS),
  ]
})
export class IconsModule { }
