import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private route: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token !== null) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });

      return next.handle(authRequest).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.authService.logout();
              this.route.navigateByUrl('/auth/login');
            }
          }

          return throwError(error);
        })
      );
    }

    return next.handle(request);
  }
}
