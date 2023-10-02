import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from '../auth/account.service';
import { IPayload } from '../models/resource/auth.model';
import { Observable, map } from 'rxjs';

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

  public onUserList(me: IPayload | null): Observable<IPayload[]> {
    console.log('chamou onUserList');
    return this.socket.fromEvent<IPayload[]>('user:list').pipe(
      map(data => data.filter(user => user.id !== me?.id)),
    );
  }

  public emitUserList(): void {
    console.log('chamou emitUserList');
    this.socket.emit('user:list');
  }

  public emitUserOnline(): void {
    console.log('chamou emitUserOnline');
    this.socket.emit('user:online');
  }

  public emitUserOffline(): void {
    console.log('chamou emitUserOffline');
    this.socket.emit('user:offline');
  }
}
