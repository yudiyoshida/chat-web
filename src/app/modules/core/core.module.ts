import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { GlobalErrorHandlerInterceptor } from './interceptors/global-error-handler.interceptor';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
    }),
    SocketIoModule.forRoot({
      url: environment.api,
      options: { autoConnect: false },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
  ],
})
export class CoreModule { }
