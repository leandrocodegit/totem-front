import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, catchError, debounceTime, filter, finalize, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService) { }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.accessToken;

    if (req.url.includes('/auth/refresh') || req.url.includes('/auth/login')) {
      return next.handle(req);
    } else if (accessToken) {
      req = this.addToken(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 && !req.url.includes('/login')) {
          return this.handle401Error(req, next);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((tokenResponse: any) => {
          this.isRefreshing = false;
          this.authService.setTokens(tokenResponse);
          this.refreshTokenSubject.next(tokenResponse.access_token);
          return next.handle(this.addToken(request, tokenResponse.access_token));
        }),
        catchError((error) => {
          console.log(error);
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error);
        }),
        finalize(() => this.isRefreshing = false)
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(accessToken => next.handle(this.addToken(request, accessToken)))
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
