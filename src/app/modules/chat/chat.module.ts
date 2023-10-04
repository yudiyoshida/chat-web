import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';
import { MessageComponent } from './components/message/message.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomComponent,
    ChatDetailComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SidenavComponent,
  ],
})
export class ChatModule { }
