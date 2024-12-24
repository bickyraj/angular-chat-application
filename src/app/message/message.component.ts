import {Component, OnInit} from '@angular/core';
import {WebSocketService} from './websocket.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Message} from './model/Message';
import {MaterialModule} from '../material/material.module';
import {MatList, MatListItem} from '@angular/material/list';
import {MatDivider} from '@angular/material/divider';
import {MatChip, MatChipSet} from '@angular/material/chips';

@Component({
  selector: 'app-message',
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    MatChipSet,
    MatChip,
  ],
  templateUrl: './message.component.html',
  standalone: true,
  styleUrl: './message.component.css'
})

export class MessageComponent implements OnInit {
  messageToSend: string = '';
  receivedMessages: Message[] = [];

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.connect();
    this.webSocketService.subscribeToMessages((message: any) => {
      if (message.body) {
        const parsedMessage = JSON.parse(message.body);
        const newMessage = new Message(parsedMessage.message);
        this.receivedMessages.push(newMessage);
        console.log('Received message:', newMessage.message);
      }
    });
  }

  // Send message to WebSocket server
  sendMessage() {
    if (this.messageToSend) {
      this.webSocketService.sendMessage(this.messageToSend);
      this.messageToSend = '';
    }
  }

  // Disconnect from WebSocket server
  disconnect() {
    this.webSocketService.disconnect();
  }

  connect() {
    this.webSocketService.connect();
  }
}
