import { Component } from '@angular/core';
import { IconsModule } from '../../../../IconsModule';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CadastroUsuarioComponent } from '../cadastro/cadastro-usuario.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/models/user.model';


const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    IconsModule, 
    NgFor, NgIf,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    
    
  ],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent {

  protected usuarios: User[] = [];
  protected isAutorizado = false;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
   // this.userService.listaTodosUsuarios().subscribe((response: any) => {
     // this.data = response.data;
   // })
   // this.isAutorizado = this.authService.isAuthorizedRoles([Role.admin])
  }

  adicionarUsuario() {
    const retorno = this.dialog.open(CadastroUsuarioComponent);

    retorno.afterClosed().subscribe(data => {
      if (data) {
      //  this.data.datas.content.push(data)
      }
    })
  }

  editarUsuario(user: User) {
    const retorno = this.dialog.open(CadastroUsuarioComponent, {
      data: JSON.parse(JSON.stringify(user))
    })
    retorno.afterClosed().subscribe(data => {
      /* if (data && data.id) {
        let userData = this.data.content.find((user:any) => user.id == data.id);
        if (userData)
          this.data.content[this.data.content.indexOf(userData!)] = data;
      } */
    })
  }

  bloquearUsuario(user: User) {
    this.dialog.open(CadastroUsuarioComponent)
  }

  removerUsuario(user: User) {
    this.dialog.open(CadastroUsuarioComponent)
  }

  redirect(url: string) {
    this.router.navigate([url])
  }
}


