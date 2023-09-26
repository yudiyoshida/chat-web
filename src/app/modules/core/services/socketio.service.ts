import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  constructor(private socket: Socket) {}

  public connect() {
    this.socket.connect();
  }

  public disconnect() {
    this.socket.disconnect();
  }
}
