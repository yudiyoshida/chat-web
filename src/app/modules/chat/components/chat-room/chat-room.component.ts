import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { AccountService } from 'src/app/modules/core/auth/account.service';
import { IMessageForm } from 'src/app/modules/core/models/forms/message.model';
import { IChat } from 'src/app/modules/core/models/resource/chat.model';
import { ChatService } from 'src/app/modules/core/services/chat.service';
import { SocketioService } from 'src/app/modules/core/services/socketio.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
  public chat!: IChat | undefined;
  public chatId!: number;

  public account$ = this.accountService.account;
  public messageForm!: FormGroup<IMessageForm>;

  @ViewChild('messagesSection') private messagesSection!: ElementRef;

  constructor(
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private fb: NonNullableFormBuilder,
    private socket: SocketioService,
  ) {}

  ngOnInit(): void {
    this.createMessageForm();
    this.getChat();
    this.registerNewMessageEvent();
  }

  ngAfterViewChecked(): void {
    const msgSection = this.messagesSection.nativeElement as HTMLDivElement;
    msgSection.scrollTop = msgSection.scrollHeight;
  }

  private getChat() {
    this.activatedRoute.params.pipe(
      map(params => params['chatId']),
      tap(chatId => this.chatId = chatId),
      tap(chatId => this.getChatById(chatId)),
    ).subscribe();
  }

  private createMessageForm() {
    this.messageForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }

  private getChatById(id: number) {
    this.chatService.getById(id).subscribe({
      next: (res) => this.chat = res,
    });
    // this.socket.emitMessageRead(this.chatId);
  }

  public registerNewMessageEvent() {
    this.socket.onMessageCreate().pipe(
      map(data => {
        if (data.chatId === +this.chatId) {
          this.chat?.messages.push(data);
        } else {
          this.socket.emitChatList();
        }
      }),
    )
    .subscribe();
  }

  public onSubmit() {
    const { content } = this.messageForm.value;

    if (content) {
      this.socket.emitMessageCreate({ chatId: +this.chatId, content });
    }
    this.messageForm.reset();
  }
}
