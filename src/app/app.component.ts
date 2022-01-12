import { Component } from '@angular/core';
import { KeyboardService } from './keyboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'keyboard';

  constructor(private keyboardService: KeyboardService) {

  }

  move(event: any, p: any, c: any, n: any) {
    const length = c.value.length;
    const maxLength = c.getAttribute('maxlength');
    if (length == maxLength) {
      if (n != '') {
        n.focus();
      }
    }
    if (event.key == 'Backspace') {
      if (p != '') {
        p.focus();
      }
    }
    console.log();
  }

  getLengthInput() {}
}
