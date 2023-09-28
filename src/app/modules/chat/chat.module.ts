import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    ChatComponent,
    ChatRoomComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MaterialModule,
    SidenavComponent,
  ],
})
export class ChatModule { }
