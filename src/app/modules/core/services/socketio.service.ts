import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from '../auth/account.service';
import { IPayload } from '../models/resource/auth.model';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private account!: IPayload | null;

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
    this.getCredentials();
    this.socket.ioSocket['auth'] = this.account;

    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public emitUserList(): void {
    this.socket.emit('user:list');
  }

  public onUserList(): Observable<IPayload[]> {
    return this.socket.fromEvent<IPayload[]>('user:list').pipe(
      tap(data => console.log(data)),
      map(data => data),
    );
  }

  public emitUserOnline(): void {
    this.socket.emit('user:online');
  }

  public emitUserOffline(): void {
    this.socket.emit('user:offline');
  }
}
