import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AccountService } from '../auth/account.service';
import { IPayload } from '../models/resource/auth.model';
import { IMessage, ISendMessage } from '../models/resource/message.model';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IChat, ICreateChat } from '../models/resource/chat.model';

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
      next: (payload) => this.socket.ioSocket['auth'] = payload,
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

  public onChatList(): Observable<IChat[]> {
    console.log('chamou onChatList');
    return this.socket.fromEvent<IChat[]>('chat:list');
  }

  public emitChatCreate(chat: ICreateChat) {
    console.log('chamou emitChatCreate');
    this.socket.emit('chat:create', chat);
  }

  public emitChatList() {
    this.socket.emit('chat:list');
  }

  public emitMessageCreate(data: ISendMessage) {
    console.log('chamou emitMessageCreate');
    this.socket.emit('message:create', data);
  }

  public onMessageCreate(): Observable<IMessage> {
    return this.socket.fromEvent<IMessage>('message:create').pipe(
      tap(() => console.log('chamou onMessageCreate')),
    );
  }

  public emitMessageRead(chatId: number) {
    console.log('chamou emitMessageRead');
    this.socket.emit('message:read', chatId);
  }
}
