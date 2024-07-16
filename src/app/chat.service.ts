import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {


  }

  public sendMessage(message: string) {
    this.socket.emit('message', message);
  }

  public lisMessage() {
    return this.socket.fromEvent('received').pipe(map((data) => data));
  }
}
