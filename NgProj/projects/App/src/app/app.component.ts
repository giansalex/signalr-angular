import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  private _hubConnection: HubConnection;
  message = '';
  messages: string[] = [];

  title = ' SignarlR';
  
  ngOnInit() {
    this._hubConnection = new HubConnectionBuilder().withUrl('http://localhost:64988/loopy')
                            .build();

    this._hubConnection.on('Send', (data: any) => {
        const received = `Received: ${data}`;
        this.messages.push(received);
    });

    this._hubConnection.start()
        .then(() => {
            console.log('Hub connection started');
        })
        .catch(err => {
            console.log('Error while establishing connection');
        });
  }

  public sendMessage(): void {
    const data = `Sent: ${this.message}`;

    this._hubConnection.invoke('Send', data);
    this.messages.push(data);
  }
}
