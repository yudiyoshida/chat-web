import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IChat } from '../models/resource/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  public getById(userId: number) {
    return this.http.get<IChat>(`${environment.api}/chats/${userId}`);
  }
}
