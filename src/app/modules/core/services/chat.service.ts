import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IChat } from '../models/resource/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  public getAll() {
    return this.http.get<IChat[]>(`${environment.api}/chats`);
  }

  public getById(chatId: number) {
    return this.http.get<IChat>(`${environment.api}/chats/${chatId}`);
  }
}
