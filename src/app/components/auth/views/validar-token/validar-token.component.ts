import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../usuarios/services/user.service';

@Component({
  selector: 'app-validar-token',
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './validar-token.component.html',
  styleUrl: './validar-token.component.scss'
})
export class ValidarTokenComponent implements OnInit, OnDestroy {

  protected timeRemaining = 5;
  private isRunning = false;
  private intervalId: any;
  protected isBrowser = signal(false);
  protected isError = false;
  protected formGroup: FormGroup;
  protected email = '';
  sms = ''

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.isBrowser.set(isPlatformBrowser(platformId));
    this.formGroup = new FormGroup({
      token: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token.sms'))
      var token: any = localStorage.getItem('token.sms')
    if (token)
      localStorage.setItem('token.sms', token);
    else
      localStorage.removeItem('token.sms');

    this.start();
    if (localStorage.getItem('user.sms') != null) {
      this.sms = localStorage.getItem('user.sms')!;
    }
    if (localStorage.getItem('user.email') != null) {
      this.email = localStorage.getItem('user.email')!;
      this.email = `${this.sms.charAt(0)}******@******${this.email.substring(this.email.length - 7, this.email.length)}`
    }

  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  isValid(id: string) {
    return !(this.formGroup.controls[id].invalid && this.formGroup.controls[id].touched);
  }

  start() {
    if (!this.isRunning && this.isBrowser()) {
      this.isRunning = true;
      this.intervalId = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this.stop();
        }
      }, 1000);
    }
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  reset() {
    this.authService.enviarToken().subscribe((response: any) => {
      localStorage.setItem("token.sms", response.data.token);
      this.userService.getUser(localStorage.getItem("user.id")!).subscribe((response: any) => {
        localStorage.setItem("user.sms", response.data.smsToken.message);
        this.sms = response.data.smsToken.message;
      })
    })
    this.stop();
    this.timeRemaining = 5;
    this.start();

  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(secs)}`;
  }

  private pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }


  validar(token: string) {
    this.isError = false;

    this.authService.validarToken(token.toUpperCase()).subscribe((response: any) => {
      this.isError = false;

      this.authService.setTokens(response.data);

      this.userService.getUser(this.authService.extrairEmailUsuario()).subscribe((response: any) => {

        localStorage.setItem("user.nome", response.data.firstName);
        localStorage.setItem("user.id", response.data.id);
        localStorage.setItem("user.email", response.data.email);

      })
      this.router.navigate(['/painel'])
    }, fail => {
      this.isError = true;
    })
  }
}
