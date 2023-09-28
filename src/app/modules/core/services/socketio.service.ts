import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from '../auth/account.service';
import { IPayload } from '../models/resource/auth.model';
import { Observable, filter, map, skipWhile, tap } from 'rxjs';
import { IMessage } from '../models/resource/message.model';
import { IChat } from '../models/resource/chat.model';

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

  public onUserList(me: IPayload | null): Observable<IPayload[]> {
    return this.socket.fromEvent<IPayload[]>('user:list').pipe(
      map(data => data.filter(user => user.id !== me?.id)),
    );
  }

  public emitUserOnline(): void {
    this.socket.emit('user:online');
  }

  public emitUserOffline(): void {
    this.socket.emit('user:offline');
  }

  public emitMessageList(userId: number): Observable<IChat> {
    return new Observable<IChat>(observer => {
      console.log(userId);
      this.socket.emit('message:list', userId, (data: IChat) => {
        console.log(data);
        observer.next(data);
      });
    });
  }
}
