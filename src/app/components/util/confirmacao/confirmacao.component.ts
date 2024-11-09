import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss'
})
export class ConfirmacaoComponent {

  constructor(
  private dialogRef: MatDialogRef<ConfirmacaoComponent>,
  @Inject(MAT_DIALOG_DATA) private data: any
) {}

 
  confirmar(){
    this.dialogRef.close(true)
  }

}
