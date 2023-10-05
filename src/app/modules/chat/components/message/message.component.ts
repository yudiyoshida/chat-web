import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/modules/core/auth/account.service';
import { IMessageForm } from 'src/app/modules/core/models/forms/message.model';
import { SocketioService } from 'src/app/modules/core/services/socketio.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnChanges {
  @Input({ required: true }) chatId!: number | null;

  public account$ = this.accountService.account;
  public messages$ = this.socket.onMessageList();

  public messageForm!: FormGroup<IMessageForm>;

  constructor(
    private fb: NonNullableFormBuilder,
    private accountService: AccountService,
    private socket: SocketioService,
  ) {}

  ngOnInit(): void {
    this.createMessageForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.socket.emitMessageList(Number(this.chatId));
  }

  public createMessageForm() {
    this.messageForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    const { content } = this.messageForm.value;

    if (content) {
      this.socket.emitMessageCreate({ chatId: Number(this.chatId), content });
    }
    this.messageForm.reset();
  }
}
