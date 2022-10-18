import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public nameList: string[] = [];
  public fileList: any[] = [];
  public notFoundList: any[] = [];
  constructor(private socket: Socket) {
    this.getMessage().subscribe((msg: any) => {
      this.fileList = msg;
    });
    this.getMessage2().subscribe((msg: any) => {
      this.notFoundList = msg;
    });
  }

  sendMessage() {
    this.socket.emit('message', this.nameList);
  }
  getMessage() {
    return this.socket.fromEvent('list').pipe(map((data: any) => data));
  }

  getMessage2() {
    return this.socket.fromEvent('NotFoundlist').pipe(map((data: any) => data));
  }

  public goTo(url: string) {
    window.open(url, '_blank');
  }
}
