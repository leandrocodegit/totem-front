import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemoFlexyModule } from '../../../demo-flexy-module';
import { IconsModule } from '../../../IconsModule';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { TopMenuComponent } from '../../util/top-menu/top-menu.component';
import { SubMenuComponent } from '../../util/sub-menu/sub-menu.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    RouterModule,
    IconsModule,
    DemoFlexyModule,
    NgFor, NgIf, AsyncPipe,
    TopMenuComponent,
    SubMenuComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

protected routerActive: string = "activelink";

}
