import { Component, inject, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input('ngModel') message: string = '';

  public messages: any = [];

  chatService = inject(ChatService);

  public sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messages.push(this.message);

    this.message = '';
  }

  public lisMessage() {
    this.chatService.lisMessage().subscribe((data:any) => {
      this.messages.push(data.data);
console.log(this.messages);

    })
  }
  ngOnInit(): void {
    this.lisMessage();
  }

}
