import { Component } from '@angular/core';
import { IconsModule } from '../../../IconsModule';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    RouterModule,
    IconsModule,
    NgFor, NgIf, AsyncPipe
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

protected routerActive: string = "activelink";

}
