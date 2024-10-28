import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IconsModule } from '../../../../IconsModule';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { Role, RoleDescriptions } from '../../../../model/constantes/role.enum';
import { environment } from '../../../../../environments/environment.prod';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    IconsModule,
    MatChipsModule,
    DatePipe
  ],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.scss'
})
export class PerfilUsuarioComponent implements OnInit {

  protected user?: User;
  protected host = environment.urlApi;

  constructor(
    public authService: AuthService,
    private readonly userService: UserService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.authService.extrairEmailUsuario()).subscribe((response: any) => {
      this.user = response.data;
     })
  }

  editarPerfil(){
    this.dialog.open(FormularioUsuarioComponent, {
      data: this.user
    })
  }

  descricaoRole(role: Role){
    return RoleDescriptions[role]
  }
}
