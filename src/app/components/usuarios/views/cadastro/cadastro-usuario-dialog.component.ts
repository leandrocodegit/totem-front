import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TituloComponent } from '../../../util/titulo/titulo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {default as _rollupMoment, Moment} from 'moment';
import * as _moment from 'moment';
import { CadastroUsuarioComponent } from './cadastro-usuario.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CadastroUsuarioComponent
  ],
  template: `<app-cadastro-usuario></app-cadastro-usuario>`,
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioDailogComponent extends CadastroUsuarioComponent { 

   constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any){
     super(router);
   }
}


