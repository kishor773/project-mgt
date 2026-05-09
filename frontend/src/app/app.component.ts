import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, CardModule, TagModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Project Management System';
  isConnected = false;

  constructor(private ws: WebsocketService) {}

  ngOnInit() {
    this.ws.connected$.subscribe(status => {
      this.isConnected = status;
    });
  }

  testConnection() {
    if (this.isConnected) {
      this.ws.emit('testEvent', { message: 'Hello from Angular!' });
      console.log('Test event emitted to backend.');
    } else {
      console.log('Cannot emit, not connected to WebSocket.');
    }
  }
}
