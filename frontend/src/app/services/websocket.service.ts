import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket;
  private connected = new BehaviorSubject<boolean>(false);
  public connected$ = this.connected.asObservable();

  constructor() {
    // Assuming backend runs on 3000
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      autoConnect: true
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
      this.connected.next(true);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
      this.connected.next(false);
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
