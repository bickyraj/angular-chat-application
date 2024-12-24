import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {
  stompClient: any;
  private serverUrl = 'http://localhost:3030/stomp-endpoint';  // Change to your WebSocket endpoint
  private isConnected: boolean = false;
  constructor() { }

  public connect() {
    const socket = new SockJS(this.serverUrl);  // SockJS provides fallback mechanisms
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame: any) => {
      this.isConnected = true;
      console.log('Connected: ' + frame);
    });
  }

  // Send a message to the WebSocket server
  sendMessage(message: string) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send('/app/hello', {}, JSON.stringify({ message: message}));  // Replace with your server's WebSocket endpoint
      console.log("Message sent: " + message);
    } else {
      console.error("Cannot send message, WebSocket not connected.");
    }
  }

  // Wrap subscription to ensure WebSocket is connected
  subscribeToMessages(callback: (message: any) => void) {
    if (this.isConnected) {
      this.stompClient.subscribe('/topic/greetings', callback);
    } else {
      // If not connected, delay the subscription until connection is ready
      const checkConnection = setInterval(() => {
        if (this.isConnected) {
          this.stompClient.subscribe('/topic/greetings', callback);
          clearInterval(checkConnection);  // Stop checking once connected
        }
      }, 100); // Check every 100 milliseconds
    }
  }

  // Disconnect from WebSocket server
  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect(() => {
        console.log('WebSocket disconnected');
      });
    }
  }
}
