import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { default as _rollupMoment, Moment } from 'moment';
import * as _moment from 'moment';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    //provideMomentDateAdapter(MY_FORMATS),
  ],
  templateUrl: './cadastro-usuario.component.html',
  styleUrl: './cadastro-usuario.component.scss'
})
export class CadastroUsuarioComponent {

  protected checked = true;
  protected date = new FormControl(moment());
  protected user!: any;

  constructor(
    private readonly _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<CadastroUsuarioComponent>) {
    if (data)
      this.user = data;
    else {
      this.user = {
        id: '',
        firstName: 'teste',
        lastName: '',
        email: 'teste', 
        status: true,
        cellphone: 'teste',
        dtBirthday: new Date
      }
    }
  }

  ngOnInit(): void { }

  fechar(): void {
    this.dialogRef.close();
  }

  salvar() {
    this.dialogRef.close(this.user);
  }

  setMonthAndYear(normalizedMonthAndYear: any, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.day(normalizedMonthAndYear.day());
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}


