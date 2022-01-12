import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  // Khai báo 1 Observable có thể lắng nghe request hiện bàn phím
  private _keyboardRequested: Subject<boolean>;
  // Khai báo 1 Observable có thể lắng nghe mỗi khi nhấn phím
  private _keyPressed: Subject<string>;
  // Khai báo 1 Observable có thể lắng nghe nút xóa và enter
  private _backspacePressed: Subject<void>;
  private _enterPressed: Subject<void>;

  constructor() {
    this._keyboardRequested = new Subject<boolean>();
    this._keyPressed = new Subject<string>();
    this._backspacePressed = new Subject<void>();
    this._enterPressed = new Subject<void>();
  }

  get KeyboardRequested() {
    return this._keyboardRequested;
  }

  get keyPressed() {
    return this._keyPressed;
  }

  get backspacePressed() {
    return this._backspacePressed;
  }

  get enterPressed() {
    return this._enterPressed;
  }

  fireKeyboardRequest(show: boolean) {
    this.KeyboardRequested.next(show);
  }

  fireKeypressed(key: string) {
    this.keyPressed.next(key);
  }

  fireBackspacePressed() {
    this.backspacePressed.next();
  }

  fireEnterPressed() {
    this.enterPressed.next();
  }
}
