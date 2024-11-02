import { Component, Inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../../../model/constantes/role.enum';
import { User } from '../../../models/user.model';


@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
  ],
  templateUrl: './formulario-usuario.component.html',
  styleUrl: './formulario-usuario.component.scss'
})
export class FormularioUsuarioComponent {

  protected checked = true;
  protected user!: User;
  protected role: Role = Role.ADMIN;

  constructor(
    private readonly _router: Router,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly dialogRef: MatDialogRef<FormularioUsuarioComponent>) {
    if (data)
      this.user = data;
    else {
      this.user = new User
    }
  }

  ngOnInit(): void { }

  fechar(): void {
    this.dialogRef.close();
  }

  salvar() {
    this.user.roles = [this.role]
    this.userService.criarUsuario(this.user).subscribe();
    this.dialogRef.close();
  }

}


