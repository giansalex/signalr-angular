import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HubConnection } from '@aspnet/signalr-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _hubConnection: HubConnection;
  public async: any;
  message = '';
  messages: string[] = [];

  title = ' SignarlR';

  public sendMessage(): void {
    const data = `Sent: ${this.message}`;

    this._hubConnection.invoke('Send', data);
    this.messages.push(data);
  }

  ngOnInit() {
    this._hubConnection = new HubConnection('http://localhost:64988/loopy');

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
}
