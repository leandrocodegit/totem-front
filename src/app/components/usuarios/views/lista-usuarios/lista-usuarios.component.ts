import { Component } from '@angular/core';
import { DemoFlexyModule } from '../../../../demo-flexy-module';
import { IconsModule } from '../../../../IconsModule';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Usuario } from '../../../../model/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { CadastroUsuarioComponent } from '../cadastro/cadastro-usuario.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { response } from 'express';
import { MatPaginatorModule } from '@angular/material/paginator';
import { environment } from '../../../../../environments/environment.prod';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/services/auth.service';
import { Role } from '../../../../model/constantes/role.enum';


const ELEMENT_DATA: Usuario[] = [];

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [
    IconsModule, NgFor,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent {

  protected data: any;
  protected isAutorizado = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.listaTodosUsuarios().subscribe((response: any) => {
      this.data = response.data;
    })
    this.isAutorizado = this.authService.isAuthorizedRoles([Role.admin])
  }

  adicionarUsuario() {
    const retorno = this.dialog.open(CadastroUsuarioComponent);

    retorno.afterClosed().subscribe(data => {
      if (data) {
        this.data.datas.content.push(data)
      }
    })
  }

  editarUsuario(user: Usuario) {
    const retorno = this.dialog.open(CadastroUsuarioComponent, {
      data: JSON.parse(JSON.stringify(user))
    })
    retorno.afterClosed().subscribe(data => {
      if (data && data.id) {
        let userData = this.data.datas.content.find((user:any) => user.id == data.id);
        if (userData)
          this.data.datas.content[this.data.datas.content.indexOf(userData!)] = data;
      }
    })
  }

  bloquearUsuario(user: Usuario) {
    this.dialog.open(CadastroUsuarioComponent)
  }

  removerUsuario(user: Usuario) {
    this.dialog.open(CadastroUsuarioComponent)
  }

  redirect(url: string) {
    this.router.navigate([url])
  }

  urlAvatar(avatar: string){
    if(!avatar)
      return 'assets/images/avatar.png'
    return `${environment.urlBff}image/id/${avatar}`
  }
}


