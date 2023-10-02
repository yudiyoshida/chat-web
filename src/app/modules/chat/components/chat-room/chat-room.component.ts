import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMessageForm } from 'src/app/modules/core/models/forms/message.model';
import { IChat } from 'src/app/modules/core/models/resource/chat.model';
import { IMessage, ISendMessage } from 'src/app/modules/core/models/resource/message.model';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  public chat$!: Observable<IChat>;
  public messages$!: Observable<IMessage[]>;

  public chatId!: number;
  public form!: FormGroup<IMessageForm>;

  constructor(
    private _fb: NonNullableFormBuilder,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscribeToUserIdParams();
    this.createForm();
  }

  private subscribeToUserIdParams() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        console.log(params['userId']);
      },
    });
  }

  private createForm() {
    this.form = this._fb.group({
      content: ['', [Validators.required]],
    });
  }

  public onSubmit() {
    const body: ISendMessage = {
      chatId: this.chatId,
      content: this.form.controls.content.value,
    };
    console.log(body);
    this.form.reset();
  }
}
