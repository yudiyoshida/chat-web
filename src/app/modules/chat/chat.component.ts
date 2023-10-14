import { Component } from '@angular/core';
import { IChat, ICreateChat } from '../core/models/resource/chat.model';
import { IUser } from '../core/models/resource/user.model';
import { Observable, map } from 'rxjs';
import { IListDialogInputs, ListDialogComponent } from '../shared/dialogs/list-dialog/list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { SocketioService } from '../core/services/socketio.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public chats$!: Observable<IChat[]>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private socket: SocketioService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getAllChats();
  }

  public getAllChats() {
    this.chats$ = this.socket.onChatList().pipe(
      map(data => {
        return data.map(item => {
          return { ...item, unreadMessages: 0 };
        });
      }),
    );
  }

  public openCreateChatDialog() {
    this.userService.getAll().subscribe({
      next: (res) => this.openListDialog(res),
    });
  }

  private openListDialog(users: IUser[]) {
    const data: IListDialogInputs = {
      data: users,
      description: 'Select participants',
      title: 'New chat',
      property: 'name',
    };

    const dialog = this.dialog.open(ListDialogComponent, {
      width: '85%',
      data,
    });

    dialog.afterClosed().subscribe({
      next: (chat) => {
        if (chat) this.createChat(chat);
      },
    });
  }

  private createChat(chat: ICreateChat) {
    this.socket.emitChatCreate(chat);
  }

  public gotoChatDetail(resource: IChat) {
    this.router.navigate([resource.id], { relativeTo: this.activatedRoute });
  }
}
