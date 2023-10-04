import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IChat } from 'src/app/modules/core/models/resource/chat.model';
import { ChatService } from 'src/app/modules/core/services/chat.service';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
})
export class ChatDetailComponent implements OnInit {
  public chat!: IChat | null;

  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => this.getChatById(+params['chatId']),
    });
  }

  public getChatById(id: number) {
    this.chatService.getById(id).subscribe({
      next: (res) => this.chat = res,
    });
  }
}
