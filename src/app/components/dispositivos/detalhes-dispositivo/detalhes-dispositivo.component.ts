import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Dispositivo } from '../../models/dispositivo.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalhes-dispositivo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './detalhes-dispositivo.component.html',
  styleUrl: './detalhes-dispositivo.component.scss'
})
export class DetalhesDispositivoComponent {

  protected dispositivo!: Dispositivo;

  constructor(
    private readonly dialogRef: MatDialogRef<DetalhesDispositivoComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private readonly data: any
  ) {
    if (data) {
      this.dispositivo = data;
    }
  }
}
