import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      { path: ':chatId', component: ChatRoomComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule { }
