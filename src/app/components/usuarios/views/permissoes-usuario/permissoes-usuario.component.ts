import { Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-permissoes-usuario',
  standalone: true,
  imports: [
    MatCheckboxModule
  ],
  templateUrl: './permissoes-usuario.component.html',
  styleUrl: './permissoes-usuario.component.scss'
})
export class PermissoesUsuarioComponent {

  salvar(){}
  fechar(){}
}
