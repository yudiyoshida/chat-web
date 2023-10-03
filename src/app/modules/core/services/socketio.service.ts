import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from '../auth/account.service';
import { IPayload } from '../models/resource/auth.model';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  public account!: IPayload | null;

  constructor(
    private socket: Socket,
    private accountService: AccountService,
  ) {}

  private getCredentials() {
    this.accountService.account.subscribe({
      next: (payload) => this.account = payload,
    });
  }

  public connect() {
    console.log('chamou connect');
    this.getCredentials();
    this.socket.ioSocket['auth'] = this.account;

    this.socket.connect();
  }

  public disconnect() {
    console.log('chamou disconnect');
    this.socket.disconnect();
  }
}
