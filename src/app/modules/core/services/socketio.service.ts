import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from '../auth/account.service';
import { IPayload } from '../models/resource/auth.model';
import { IMessage, ISendMessage } from '../models/resource/message.model';
import { Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ICreateChat } from '../models/resource/chat.model';

@Injectable({
  providedIn: 'root',
})
export class SocketioService implements OnInit {
  public account!: IPayload | null;

  constructor(
    private socket: Socket,
    private toastr: ToastrService,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.onError();
  }

  private getCredentials() {
    this.accountService.account.subscribe({
      next: (payload) => {
        this.socket.ioSocket['auth'] = payload;
      },
    });
  }

  private onError(): void {
    this.socket.fromEvent<string>('error').subscribe({
      next: (res) => this.toastr.error(res),
    });
  }

  public connect(): void {
    console.log('chamou connect');
    this.getCredentials();
    this.socket.connect();
  }

  public disconnect(): void {
    console.log('chamou disconnect');
    this.socket.disconnect();
  }

  public emitChatCreate(chat: ICreateChat) {
    console.log('chamou emitChatCreate');
    this.socket.emit('chat:create', chat);
  }

  public emitRoomList() {
    this.socket.emit('room:list');
  }

  public emitMessageList(chatId: number): void {
    console.log('chamou emitMessageList');
    this.socket.emit('message:list', chatId);
  }

  public onMessageList(): Observable<IMessage[]> {
    console.log('chamou onMessageList');
    return this.socket.fromEvent<IMessage[]>('message:list').pipe(
      map(data => data),
    );
  }

  public emitMessageCreate(data: ISendMessage) {
    console.log('chamou emitMessageCreate');
    this.socket.emit('message:create', data);
  }
}
