import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';

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
  constructor(private socket: Socket, private clipboard: Clipboard) {
    this.getMessage().subscribe((msg: any) => {
      this.fileList = msg;
      console.log("🚀 ~ file: app.component.ts ~ line 18 ~ AppComponent ~ this.getMessage ~ msg", msg)
    });
    this.getMessage2().subscribe((msg: any) => {
      this.notFoundList = msg;
    });
  }

  copy() {
    let pathList: string = '';
    this.fileList.forEach((element: any) => {
      if (element.type == 0) {
        pathList = pathList + `"${element.path}" `;
      }
    });
    this.clipboard.copy(pathList);
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
