import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center">
      <h1>
        Welcome to {{title}}!
      </h1>
      <img width="300" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
    </div>
    <div class="container-fluid">
      <h1>Send some basic messages</h1>
      <div class="row">
          <form class="form-inline" (ngSubmit)="sendMessage()" #messageForm="ngForm">
              <div class="form-group">
                  <label class="sr-only" for="message">Message</label>
                  <input type="text" class="form-control" id="message" placeholder="your message..." name="message" [(ngModel)]="message" required>
              </div>
              <button type="submit" class="btn btn-primary" [disabled]="!messageForm.valid">Send SignalR Message</button>
          </form>
      </div>
      <div class="row" *ngIf="messages.length > 0">
          <div class="table-responsive">
              <table class="table table-striped">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Messages</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr *ngFor="let message of messages; let i = index">
                          <td>{{i + 1}}</td>
                          <td>{{message}}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
      <div class="row" *ngIf="messages.length <= 0">
          <span>No messages</span>
      </div>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  private _hubConnection: HubConnection;
  public async: any;
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
