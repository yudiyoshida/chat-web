import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (!(err instanceof HttpErrorResponse)) {
          err = err.rejection;
        }

        this.toastr.error(err.error.error ?? 'Erro interno no servidor.');
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        throw (() => {});
      }),
    );
  }
}
