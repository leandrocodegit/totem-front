import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IconsModule } from '../../../../IconsModule';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { response } from 'express';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadComponent } from '../../../util/load/load.component';
import { UserService } from '../../../usuarios/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    MatButtonModule,
    NgIf,
    MatProgressSpinnerModule,
    LoadComponent
  ],
  providers: [
    AuthService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected email = 'lpoliveira.ti@gmail.com';
  protected password = 'Senha@123';
  protected isError = false;
  protected isLoad = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  login() {

    this.isLoad = true;
    this.isError = false;

    this.authService.login(this.email, this.password).subscribe((response: any) => {

      localStorage.setItem("token.sms", response.data.body.data.token);

      this.isError = false;

      this.isLoad = false;
      this.router.navigate([`/validar-token`]);


    }, fail => {
      this.isError = true;
      this.isLoad = false;
    })


  }

}
