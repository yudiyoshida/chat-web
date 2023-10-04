import { Component } from '@angular/core';
import { IChat, ICreateChat } from '../core/models/resource/chat.model';
import { IUser } from '../core/models/resource/user.model';
import { Observable, map, tap } from 'rxjs';
import { IListDialogInputs, ListDialogComponent } from '../shared/dialogs/list-dialog/list-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../core/services/chat.service';
import { UserService } from '../core/services/user.service';
import { FormControl, Validators } from '@angular/forms';

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
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getAllChats();
  }

  public getAllChats() {
    this.chats$ = this.chatService.getAll().pipe(
      // tap(data => console.log(data)),
      map(data => data),
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
    this.chatService.create(chat).subscribe({
      next: (res) => {
        this.getAllChats();
        this.gotoChatDetail(res);
      },
    });
  }

  public gotoChatDetail(resource: IChat) {
    this.router.navigate([resource.id], { relativeTo: this.activatedRoute });
  }
}
