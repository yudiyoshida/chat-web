import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IChat } from 'src/app/modules/core/models/resource/chat.model';
import { SocketioService } from 'src/app/modules/core/services/socketio.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  public chat$!: Observable<IChat | null>;

  @ViewChild('messageInput') msgInput!: ElementRef<HTMLInputElement>;

  constructor(
    private socket: SocketioService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscribeToUserIdParams();
  }

  private subscribeToUserIdParams() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.chat$ = this.socket.emitMessageList(params['userId']);
      },
    });
  }
}
