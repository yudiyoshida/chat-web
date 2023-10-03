import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { IChat } from '../core/models/resource/chat.model';
import { ChatService } from '../core/services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateChatDialogComponent } from '../shared/dialogs/create-chat-dialog/create-chat-dialog.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public chats$!: Observable<IChat[]>;

  constructor(
    private dialog: MatDialog,
    private chatService: ChatService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.chats$ = this.chatService.getAll().pipe(
      tap(data => console.log(data)),
      map(data => data),
    );
  }

  public openCreateChatDialog() {
    const dialog = this.dialog.open(CreateChatDialogComponent);
  }

  public gotoChatDetail(resource: IChat) {
    this.router.navigate([resource.id], { relativeTo: this.activatedRoute });
  }
}
