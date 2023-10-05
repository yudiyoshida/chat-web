import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IChat } from 'src/app/modules/core/models/resource/chat.model';
import { ChatService } from 'src/app/modules/core/services/chat.service';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
})
export class ChatDetailComponent implements OnChanges {
  @Input({ required: true }) chatId!: number | null;

  public chat$!: Observable<IChat>;

  constructor(private chatService: ChatService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.chat$ = this.chatService.getById(Number(this.chatId)).pipe(
      map(data => data),
    );
  }
}
